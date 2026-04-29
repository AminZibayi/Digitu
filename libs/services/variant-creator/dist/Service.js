"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantCreatorService = void 0;
const core_1 = require("@digikala/core");
class VariantCreatorService {
    client;
    db;
    constructor(client, db) {
        this.client = client;
        this.db = db;
    }
    async runCreation(products, config, dryRun, onProgress) {
        const validatedProducts = this.parseProducts(products);
        const resolvedConfig = this.parseConfig(config);
        core_1.logger.info('Starting Variant Creation', { dryRun, productCount: validatedProducts.length });
        const results = [];
        for (let i = 0; i < validatedProducts.length; i++) {
            const product = validatedProducts[i];
            onProgress?.(i, validatedProducts.length, product.productTitle, 'processing');
            core_1.logger.info(`Processing product ${i + 1}/${validatedProducts.length}`, { title: product.productTitle });
            try {
                const existingFingerprints = await this.loadExistingFingerprints(product.productId);
                let created = 0;
                let skipped = 0;
                for (const draft of this.buildVariantDrafts(resolvedConfig, product.productId)) {
                    const fingerprint = this.variantFingerprint(product.productId, draft.themeValueId, draft.payload.price, draft.payload.warranty_id, draft.payload.site);
                    if (this.db.hasVariantState(fingerprint) || existingFingerprints.has(fingerprint)) {
                        skipped += 1;
                        continue;
                    }
                    if (dryRun) {
                        created += 1;
                        continue;
                    }
                    const response = await this.client.requestJson(`/variant-creation/v2/${product.productId}`, { method: 'POST', body: draft.payload });
                    const variantId = response.data?.data?.id;
                    if (!variantId) {
                        throw new Error(`Variant API response missing variant id for product ${product.productId}`);
                    }
                    this.db.addVariantState(fingerprint, product.productId, variantId);
                    created += 1;
                }
                const status = created > 0 ? (dryRun ? 'success (dry-run)' : 'success') : 'skipped (duplicate)';
                onProgress?.(i, validatedProducts.length, product.productTitle, status);
                results.push({ status, title: product.productTitle, created, skipped });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown variant creation error';
                core_1.logger.error(`Failed creating variant for ${product.productTitle}`, { error: message });
                onProgress?.(i, validatedProducts.length, product.productTitle, 'failed');
                results.push({ status: 'failed', title: product.productTitle, error: message });
            }
        }
        return results;
    }
    parseProducts(products) {
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error('products must be a non-empty array');
        }
        return products.map((row, index) => {
            const productId = Number(row.productId);
            const productTitle = String(row.productTitle ?? '').trim();
            if (!Number.isInteger(productId) || productId <= 0) {
                throw new Error(`Invalid productId at row ${index + 1}`);
            }
            if (!productTitle) {
                throw new Error(`Missing productTitle at row ${index + 1}`);
            }
            return { productId, productTitle };
        });
    }
    parseConfig(config) {
        const input = (config ?? {});
        const themeId = Number(input.themeId);
        if (!Number.isInteger(themeId) || themeId <= 0) {
            throw new Error('config.themeId must be a positive integer');
        }
        if (!Array.isArray(input.sizes) || input.sizes.length === 0) {
            throw new Error('config.sizes must be a non-empty array');
        }
        const sizes = input.sizes.map((item, index) => {
            const key = String(item.key ?? '').trim();
            const themeValueId = Number(item.themeValueId);
            const price = Number(item.price);
            let warrantyId;
            if (item.warrantyId !== undefined && item.warrantyId !== null && String(item.warrantyId).trim() !== '') {
                const parsedWarrantyId = Number(item.warrantyId);
                if (Number.isInteger(parsedWarrantyId) && parsedWarrantyId > 0) {
                    warrantyId = parsedWarrantyId;
                }
            }
            if (!key) {
                throw new Error(`config.sizes[${index}].key is required`);
            }
            if (!Number.isInteger(themeValueId) || themeValueId <= 0) {
                throw new Error(`config.sizes[${index}].themeValueId must be a positive integer`);
            }
            if (!Number.isFinite(price) || price <= 0) {
                throw new Error(`config.sizes[${index}].price must be a positive number`);
            }
            return {
                key,
                themeValueId,
                price: Math.round(price),
                warrantyId,
                active: item.active !== false,
            };
        });
        return {
            themeId,
            site: String(input.site || 'digikala'),
            sizes,
            defaults: input.defaults && typeof input.defaults === 'object' ? input.defaults : {},
        };
    }
    buildVariantDrafts(config, productId) {
        return config.sizes
            .filter((size) => size.active !== false)
            .map((size) => ({
            themeValueId: size.themeValueId,
            payload: {
                ...config.defaults,
                id: null,
                site: config.site || 'digikala',
                price: size.price,
                warranty_id: size.warrantyId,
                theme_values: [
                    {
                        theme_value_id: size.themeValueId,
                        theme_id: config.themeId,
                    },
                ],
                product_id: productId,
            },
        }));
    }
    variantFingerprint(productId, themeValueId, price, warrantyId, site) {
        return `${productId}|${themeValueId}|${String(price)}|${String(warrantyId ?? 'none')}|${String(site ?? 'digikala')}`;
    }
    async loadExistingFingerprints(productId) {
        const fingerprints = new Set();
        try {
            const payload = await this.client.requestJson(`/variant-creation/${productId}`, {
                method: 'GET',
            });
            const variants = payload.data?.variants ?? payload.data?.items ?? [];
            for (const variant of variants) {
                const themeValueId = Number(variant?.theme_values?.[0]?.theme_value_id ??
                    variant?.theme_values?.[0]?.themeValue?.id ??
                    variant?.size_id);
                const price = Number(variant?.price ?? 0);
                const warrantyId = Number(variant?.warranty_id ?? 0);
                const site = String(variant?.site ?? 'digikala');
                if (Number.isInteger(themeValueId) && themeValueId > 0 && price > 0) {
                    fingerprints.add(this.variantFingerprint(productId, themeValueId, price, warrantyId || 'none', site));
                }
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'unknown error';
            core_1.logger.warn('Failed to load existing variants; continuing with local idempotency only', { productId, error: message });
        }
        return fingerprints;
    }
}
exports.VariantCreatorService = VariantCreatorService;
//# sourceMappingURL=Service.js.map