import { DigikalaClient, Database, logger } from '@digikala/core';

interface VariantSizeConfig {
  key: string;
  themeValueId: number;
  price: number;
  warrantyId?: number;
  active?: boolean;
}

interface VariantCreationConfig {
  themeId: number;
  site?: string;
  sizes: VariantSizeConfig[];
  defaults?: Record<string, unknown>;
}

export class VariantCreatorService {
  constructor(private client: DigikalaClient, private db: Database) {}

  public async runCreation(
    products: any[],
    config: any,
    dryRun: boolean,
    onProgress?: (index: number, total: number, productTitle: string, status: string, error?: string) => void,
  ) {
    const validatedProducts = this.parseProducts(products);
    const resolvedConfig = this.parseConfig(config);

    logger.info('Starting Variant Creation', { dryRun, productCount: validatedProducts.length });
    const results: Array<{ status: string; title: string; created?: number; skipped?: number; error?: string }> = [];

    for (let i = 0; i < validatedProducts.length; i++) {
      const product = validatedProducts[i];

      onProgress?.(i, validatedProducts.length, product.productTitle, 'processing');
      logger.info(`Processing product ${i + 1}/${validatedProducts.length}`, { title: product.productTitle });

      try {
        const existingFingerprints = await this.loadExistingFingerprints(product.productId);
        let created = 0;
        let skipped = 0;

        for (const draft of this.buildVariantDrafts(resolvedConfig, product.productId)) {
          const fingerprint = this.variantFingerprint(product.productId, draft.themeValueId, draft.payload.price, draft.payload.warranty_id, draft.payload.site);
          if (await this.db.hasVariantState(fingerprint) || existingFingerprints.has(fingerprint)) {
            skipped += 1;
            continue;
          }

          if (dryRun) {
            created += 1;
            continue;
          }

          const response = await this.client.requestJson<{ data?: { data?: { id?: number } } }>(
            `/variant-creation/v2/${product.productId}`,
            { method: 'POST', body: draft.payload },
          );
          const variantId = response.data?.data?.id;
          if (!variantId) {
            throw new Error(`Variant API response missing variant id for product ${product.productId}`);
          }

          await this.db.addVariantState(fingerprint, product.productId, variantId);
          created += 1;
        }

        const status = created > 0 ? (dryRun ? 'success (dry-run)' : 'success') : 'skipped (duplicate)';
        onProgress?.(i, validatedProducts.length, product.productTitle, status);
        results.push({ status, title: product.productTitle, created, skipped });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown variant creation error';
        logger.error(`Failed creating variant for ${product.productTitle}`, { error: message });
        onProgress?.(i, validatedProducts.length, product.productTitle, 'failed', message);
        results.push({ status: 'failed', title: product.productTitle, error: message });
      }
    }

    return results;
  }

  private parseProducts(products: unknown): Array<{ productId: number; productTitle: string }> {
    if (!Array.isArray(products) || products.length === 0) {
      throw new Error('products must be a non-empty array');
    }
    return products.map((row, index) => {
      const productId = Number((row as { productId?: unknown }).productId);
      const productTitle = String((row as { productTitle?: unknown }).productTitle ?? '').trim();
      if (!Number.isInteger(productId) || productId <= 0) {
        throw new Error(`Invalid productId at row ${index + 1}`);
      }
      if (!productTitle) {
        throw new Error(`Missing productTitle at row ${index + 1}`);
      }
      return { productId, productTitle };
    });
  }

  private parseConfig(config: unknown): VariantCreationConfig {
    const input = (config ?? {}) as Partial<VariantCreationConfig>;
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
      let warrantyId: number | undefined;
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

  private buildVariantDrafts(config: VariantCreationConfig, productId: number): Array<{ themeValueId: number; payload: Record<string, unknown> }> {
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

  private variantFingerprint(productId: number, themeValueId: number, price: unknown, warrantyId: unknown, site: unknown): string {
    return `${productId}|${themeValueId}|${String(price)}|${String(warrantyId ?? 'none')}|${String(site ?? 'digikala')}`;
  }

  private async loadExistingFingerprints(productId: number): Promise<Set<string>> {
    const fingerprints = new Set<string>();
    try {
      const payload = await this.client.requestJson<{ data?: { variants?: any[]; items?: any[] } }>(`/variant-creation/${productId}`, {
        method: 'GET',
      });
      const variants = payload.data?.variants ?? payload.data?.items ?? [];
      for (const variant of variants) {
        const themeValueId = Number(
          variant?.theme_values?.[0]?.theme_value_id ??
            variant?.theme_values?.[0]?.themeValue?.id ??
            variant?.size_id,
        );
        const price = Number(variant?.price ?? 0);
        const warrantyId = Number(variant?.warranty_id ?? 0);
        const site = String(variant?.site ?? 'digikala');
        if (Number.isInteger(themeValueId) && themeValueId > 0 && price > 0) {
          fingerprints.add(this.variantFingerprint(productId, themeValueId, price, warrantyId || 'none', site));
        }
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'unknown error';
      logger.warn('Failed to load existing variants; continuing with local idempotency only', { productId, error: message });
    }
    return fingerprints;
  }
}
