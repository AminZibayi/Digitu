"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUploaderService = void 0;
const core_1 = require("@digikala/core");
const sync_1 = require("csv-parse/sync");
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const CATEGORY_ID = 6946;
const ATTR = {
    USAGE_TYPE: 4931,
    PIECE_COUNT_SELECT: 5127,
    VISUAL_FEATURE: 5218,
    DESIGN: 6597,
    FRAME_TYPE: 8482,
    FRAME_MATERIAL: 10043,
    FRAME_COLOR: 10129,
    SURFACE_GUARD: 10132,
    EXTRA_DESCRIPTION: 119,
    RESISTANCE: 5065,
    WASHING_METHOD: 5080,
    GENERAL_DESIGN: 7830,
    FRAME_THICKNESS_MM: 10130,
    PRINT_TYPE: 10131,
};
class ProductUploaderService {
    client;
    db;
    constructor(client, db) {
        this.client = client;
        this.db = db;
    }
    async runUpload(csvPath, autoPublish, onProgress) {
        if (!fs_1.default.existsSync(csvPath)) {
            throw new Error(`CSV File not found: ${csvPath}`);
        }
        core_1.logger.info('Starting CSV parsing', { csvPath });
        const content = fs_1.default.readFileSync(csvPath, 'utf-8').replace(/^\uFEFF/, '');
        const records = (0, sync_1.parse)(content, { columns: true, skip_empty_lines: true, trim: true });
        const parsedRows = records.map((row, i) => this.parseRow(row, i + 2));
        core_1.logger.info(`Loaded ${parsedRows.length} records. Beginning upload pipeline.`);
        const results = [];
        for (let i = 0; i < parsedRows.length; i++) {
            const row = parsedRows[i];
            const title = row.title_fa || row.model || `Row ${i + 2}`;
            onProgress?.(i, parsedRows.length, title, 'processing');
            core_1.logger.info(`Processing record ${i + 1}/${parsedRows.length}`, { title });
            try {
                const draftId = await this.saveBasicInfo(row);
                await this.saveAttributes(draftId, row);
                await this.saveTitle(draftId, row);
                const encryptedIds = await this.uploadImages(row.image_paths);
                const productId = await this.finalizeProduct(draftId, encryptedIds);
                if (!productId) {
                    throw new Error('Product creation completed but no productId was returned.');
                }
                if (autoPublish) {
                    core_1.logger.info(`Auto-publishing product ${productId}`);
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    await this.publishProduct(productId);
                }
                this.db.addProduct(productId, title, row.model, csvPath);
                onProgress?.(i, parsedRows.length, title, 'success');
                results.push({ status: 'success', title, productId });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'Unknown upload error';
                core_1.logger.error(`Failed processing record ${title}`, { error: message });
                onProgress?.(i, parsedRows.length, title, 'failed');
                results.push({ status: 'failed', title, error: message });
            }
        }
        return results;
    }
    parseRow(row, rowNumber) {
        const getString = (key, fallback = '') => String(row[key] ?? fallback).trim();
        const parseNumber = (value) => {
            if (!value || !value.trim())
                return null;
            const parsed = Number(value.trim());
            return Number.isFinite(parsed) ? parsed : null;
        };
        const parseIds = (value) => String(value || '')
            .split('|')
            .map((x) => Number(x.trim()))
            .filter((n) => Number.isInteger(n) && n > 0);
        const parseStrings = (value) => String(value || '')
            .split('|')
            .map((x) => x.trim())
            .filter(Boolean);
        const parseBoolean = (value, defaultValue = false) => {
            const normalized = String(value || '').trim().toLowerCase();
            if (!normalized)
                return defaultValue;
            if (['1', 'true', 'yes', 'y'].includes(normalized))
                return true;
            if (['0', 'false', 'no', 'n'].includes(normalized))
                return false;
            return defaultValue;
        };
        const brandId = Number(getString('brand_id'));
        const divisionId = Number(getString('division_id'));
        const generalMefaId = Number(getString('general_mefa_id'));
        const model = getString('model');
        const titleFa = getString('title_fa');
        const imagePaths = parseStrings(getString('image_paths'));
        const productTypeIds = parseIds(getString('product_type_ids'));
        if (!Number.isInteger(brandId) || brandId <= 0) {
            throw new Error(`Row ${rowNumber}: invalid brand_id`);
        }
        if (!Number.isInteger(divisionId) || divisionId <= 0) {
            throw new Error(`Row ${rowNumber}: invalid division_id`);
        }
        if (!Number.isInteger(generalMefaId) || generalMefaId <= 0) {
            throw new Error(`Row ${rowNumber}: invalid general_mefa_id`);
        }
        if (!model) {
            throw new Error(`Row ${rowNumber}: missing model`);
        }
        if (!titleFa) {
            throw new Error(`Row ${rowNumber}: missing title_fa`);
        }
        if (productTypeIds.length === 0) {
            throw new Error(`Row ${rowNumber}: product_type_ids must include at least one positive integer`);
        }
        if (imagePaths.length < 2) {
            throw new Error(`Row ${rowNumber}: image_paths must contain at least two images`);
        }
        return {
            brand_id: brandId,
            model,
            division_id: divisionId,
            product_type_ids: productTypeIds,
            is_iranian: parseBoolean(getString('is_iranian'), true),
            product_classes: parseStrings(getString('product_classes')),
            general_mefa_id: generalMefaId,
            description: getString('description'),
            title_fa: titleFa,
            title_en: getString('title_en'),
            attr_usage_type_ids: parseIds(getString('attr_usage_type_ids') || getString('attr_subject_ids')),
            attr_piece_count_select_ids: parseIds(getString('attr_piece_count_select_ids') || getString('attr_technique_ids')),
            attr_visual_feature_ids: parseIds(getString('attr_visual_feature_ids')),
            attr_design: getString('attr_design'),
            attr_frame_type_ids: parseIds(getString('attr_frame_type_ids')),
            attr_frame_material_ids: parseIds(getString('attr_frame_material_ids')),
            attr_frame_color: getString('attr_frame_color'),
            attr_surface_guard_ids: parseIds(getString('attr_surface_guard_ids')),
            attr_extra_description: getString('attr_extra_description') || getString('attr_description'),
            attr_resistance_ids: parseIds(getString('attr_resistance_ids')),
            attr_washing_method_ids: parseIds(getString('attr_washing_method_ids')),
            attr_general_design_ids: parseIds(getString('attr_general_design_ids')),
            attr_frame_thickness_mm: getString('attr_frame_thickness_mm') || getString('attr_piece_count'),
            attr_print_type_ids: parseIds(getString('attr_print_type_ids')),
            advantages: parseStrings(getString('advantages')),
            disadvantages: parseStrings(getString('disadvantages')),
            width: parseNumber(getString('width')),
            height: parseNumber(getString('height')),
            length: parseNumber(getString('length')),
            weight: parseNumber(getString('weight')),
            package_width: parseNumber(getString('package_width')),
            package_height: parseNumber(getString('package_height')),
            package_length: parseNumber(getString('package_length')),
            package_weight: parseNumber(getString('package_weight')),
            image_paths: imagePaths,
        };
    }
    async saveBasicInfo(product) {
        const data = await this.client.requestJson('/product-creation/product/detail/validation', {
            method: 'POST',
            body: {
                category_id: CATEGORY_ID,
                division_id: product.division_id,
                brand_id: product.brand_id,
                model: product.model,
                product_type_ids: product.product_type_ids,
                is_iranian: product.is_iranian,
                product_classes: product.product_classes,
                fake_reasons: [],
                general_mefa_id: product.general_mefa_id,
                exclusive_mefa_id: null,
                fake: false,
                description: product.description,
                package_width: product.package_width ?? 0,
                package_height: product.package_height ?? 0,
                package_length: product.package_length ?? 0,
                package_weight: product.package_weight ?? 0,
                advantages: product.advantages,
                disadvantages: product.disadvantages,
                only_cf_fields: {
                    status: 'marketable',
                    platforms: ['digikala'],
                    other_titles: [],
                },
            },
        });
        if (data.data?.is_valid === false) {
            throw new Error(`Basic info validation failed: ${JSON.stringify(data.data.errors ?? data.data)}`);
        }
        const draftId = data.data?.draft_product_id ?? data.data?.bind?.draft_product_id ?? data.data?.id;
        if (!draftId) {
            throw new Error(`No draft_product_id in validation response.`);
        }
        return draftId;
    }
    addArrayAttr(attributes, id, value) {
        if (value.length > 0) {
            attributes.push({ id, value });
        }
    }
    addStringAttr(attributes, id, value) {
        const normalized = value.trim();
        if (normalized) {
            attributes.push({ id, value: normalized });
        }
    }
    async saveAttributes(draftProductId, product) {
        const attributes = [];
        this.addArrayAttr(attributes, ATTR.USAGE_TYPE, product.attr_usage_type_ids);
        this.addArrayAttr(attributes, ATTR.PIECE_COUNT_SELECT, product.attr_piece_count_select_ids);
        this.addArrayAttr(attributes, ATTR.VISUAL_FEATURE, product.attr_visual_feature_ids);
        this.addStringAttr(attributes, ATTR.DESIGN, product.attr_design);
        this.addArrayAttr(attributes, ATTR.FRAME_TYPE, product.attr_frame_type_ids);
        this.addArrayAttr(attributes, ATTR.FRAME_MATERIAL, product.attr_frame_material_ids);
        this.addStringAttr(attributes, ATTR.FRAME_COLOR, product.attr_frame_color);
        this.addArrayAttr(attributes, ATTR.SURFACE_GUARD, product.attr_surface_guard_ids);
        this.addStringAttr(attributes, ATTR.EXTRA_DESCRIPTION, product.attr_extra_description);
        this.addArrayAttr(attributes, ATTR.RESISTANCE, product.attr_resistance_ids);
        this.addArrayAttr(attributes, ATTR.WASHING_METHOD, product.attr_washing_method_ids);
        this.addArrayAttr(attributes, ATTR.GENERAL_DESIGN, product.attr_general_design_ids);
        this.addStringAttr(attributes, ATTR.FRAME_THICKNESS_MM, product.attr_frame_thickness_mm);
        this.addArrayAttr(attributes, ATTR.PRINT_TYPE, product.attr_print_type_ids);
        await this.client.requestJson('/product-creation/attributes', {
            method: 'POST',
            body: {
                draft_product_id: draftProductId,
                category_id: CATEGORY_ID,
                attributes,
                width: product.width,
                height: product.height,
                length: product.length,
                weight: product.weight,
            },
        });
    }
    async saveTitle(draftProductId, product) {
        await this.client.requestJson('/product-creation/auto-title/save', {
            method: 'POST',
            body: {
                draft_product_id: draftProductId,
                title_fa: product.title_fa,
                title_en: product.title_en,
            },
        });
    }
    async uploadImage(imagePath, slot) {
        if (!fs_1.default.existsSync(imagePath)) {
            throw new Error(`Image not found: ${imagePath}`);
        }
        const form = new form_data_1.default();
        form.append('file', fs_1.default.createReadStream(imagePath), path_1.default.basename(imagePath));
        form.append('slot', String(slot));
        const response = await this.client.requestJson('/product-creation/images/upload', { method: 'POST', body: form });
        const encryptedId = response.data?.data?.id ?? response.data?.id;
        if (!encryptedId) {
            throw new Error(`Image upload response did not include encrypted id for slot ${slot}`);
        }
        return encryptedId;
    }
    async uploadImages(imagePaths) {
        const encryptedIds = [];
        for (let i = 0; i < imagePaths.length; i++) {
            const encryptedId = await this.uploadImage(imagePaths[i], i + 1);
            encryptedIds.push(encryptedId);
        }
        return encryptedIds;
    }
    async finalizeProduct(draftProductId, encryptedIds) {
        const [mainImage, ...rest] = encryptedIds;
        const response = await this.client.requestJson('/product-creation/save', {
            method: 'POST',
            body: {
                category_id: CATEGORY_ID,
                draft_product_id: draftProductId,
                only_b2b: false,
                photos_detail: {
                    main_image: mainImage,
                    order: encryptedIds.join(','),
                    images: [{ encrypted_id: mainImage, active: true }, ...rest.map((id) => ({ encrypted_id: id }))],
                },
            },
        });
        return response.data?.data?.product_id ?? response.data?.product_id ?? null;
    }
    async publishProduct(productId) {
        try {
            const res = await this.client.requestJson(`/product/publish/${productId}/`, {
                method: 'POST',
                body: {}
            });
            return res.status === 'ok';
        }
        catch (error) {
            core_1.logger.error({ productId, error: error.message }, 'Failed to auto-publish product');
            return false;
        }
    }
}
exports.ProductUploaderService = ProductUploaderService;
//# sourceMappingURL=Service.js.map