import { DigikalaSettingsInput, normalizeDigikalaSettings } from '@digikala/core';

type GenericRecord = Record<string, unknown>;

export interface ParsedUploadRequest {
  csvPath: string;
}

export interface ParsedVariantCreationRequest {
  products: Array<{ productId: number; productTitle: string }>;
  config: GenericRecord;
  dryRun: boolean;
}

function asRecord(value: unknown, context: string): GenericRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${context} must be an object`);
  }
  return value as GenericRecord;
}

function asNonEmptyString(value: unknown, field: string): string {
  const normalized = String(value ?? '').trim();
  if (!normalized) {
    throw new Error(`${field} is required`);
  }
  return normalized;
}

export function parseUploadRequest(body: unknown): ParsedUploadRequest {
  const payload = asRecord(body, 'request body');
  return {
    csvPath: asNonEmptyString(payload.csvPath, 'csvPath'),
  };
}

export function parseVariantCreationRequest(body: unknown): ParsedVariantCreationRequest {
  const payload = asRecord(body, 'request body');
  const productsRaw = payload.products;
  if (!Array.isArray(productsRaw) || productsRaw.length === 0) {
    throw new Error('products must be a non-empty array');
  }

  const products = productsRaw.map((item, index) => {
    const productRow = asRecord(item, `products[${index}]`);
    const productId = Number(productRow.productId);
    const productTitle = asNonEmptyString(productRow.productTitle, `products[${index}].productTitle`);
    if (!Number.isInteger(productId) || productId <= 0) {
      throw new Error(`products[${index}].productId must be a positive integer`);
    }
    return { productId, productTitle };
  });

  const config = asRecord(payload.config, 'config');
  const themeId = Number(config.themeId);
  if (!Number.isInteger(themeId) || themeId <= 0) {
    throw new Error('config.themeId must be a positive integer');
  }
  if (!Array.isArray(config.sizes) || config.sizes.length === 0) {
    throw new Error('config.sizes must be a non-empty array');
  }

  return {
    products,
    config,
    dryRun: Boolean(payload.dryRun),
  };
}

export function buildNormalizedSettingsPayload(body: unknown, existingCookie: string | null) {
  const payload = asRecord(body, 'request body');
  const mergedPayload: DigikalaSettingsInput = { ...payload };
  const incomingCookie = String(payload.cookie ?? '').trim();
  if (!incomingCookie && existingCookie) {
    mergedPayload.cookie = existingCookie;
  }
  return normalizeDigikalaSettings(mergedPayload);
}
