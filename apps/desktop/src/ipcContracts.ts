import type { DigikalaSettingsInput } from '@digikala/core';

type GenericRecord = Record<string, unknown>;

export interface ParsedRunVariantCreationInput {
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

export function parseRunUploadInput(csvPath: unknown): string {
  return asNonEmptyString(csvPath, 'csvPath');
}

export function parseSaveSettingsInput(payload: unknown, existingCookie: string | null): DigikalaSettingsInput {
  const parsedPayload = asRecord(payload, 'settings');
  const mergedPayload: DigikalaSettingsInput = { ...parsedPayload };
  const incomingCookie = String(parsedPayload.cookie ?? '').trim();
  if (!incomingCookie && existingCookie) {
    mergedPayload.cookie = existingCookie;
  }
  return mergedPayload;
}

export function parseRunVariantCreationInput(
  productsRaw: unknown,
  configRaw: unknown,
  dryRunRaw: unknown,
): ParsedRunVariantCreationInput {
  if (!Array.isArray(productsRaw) || productsRaw.length === 0) {
    throw new Error('products must be a non-empty array');
  }

  const products = productsRaw.map((item, index) => {
    const product = asRecord(item, `products[${index}]`);
    const productId = Number(product.productId);
    const productTitle = asNonEmptyString(product.productTitle, `products[${index}].productTitle`);
    if (!Number.isInteger(productId) || productId <= 0) {
      throw new Error(`products[${index}].productId must be a positive integer`);
    }
    return { productId, productTitle };
  });

  const config = asRecord(configRaw, 'config');
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
    dryRun: Boolean(dryRunRaw),
  };
}
