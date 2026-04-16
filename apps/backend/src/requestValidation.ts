import { DigikalaSettingsInput, normalizeDigikalaSettings } from '@digikala/core';
import { ApiError } from './apiError';

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
    throw new ApiError('INVALID_REQUEST', `${context} must be an object`, 400);
  }
  return value as GenericRecord;
}

function asNonEmptyString(value: unknown, field: string): string {
  const normalized = String(value ?? '').trim();
  if (!normalized) {
    throw new ApiError('INVALID_REQUEST', `${field} is required`, 400);
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
    throw new ApiError('INVALID_REQUEST', 'products must be a non-empty array', 400);
  }

  const products = productsRaw.map((item, index) => {
    const productRow = asRecord(item, `products[${index}]`);
    const productId = Number(productRow.productId);
    const productTitle = asNonEmptyString(productRow.productTitle, `products[${index}].productTitle`);
    if (!Number.isInteger(productId) || productId <= 0) {
      throw new ApiError('INVALID_REQUEST', `products[${index}].productId must be a positive integer`, 400);
    }
    return { productId, productTitle };
  });

  const config = asRecord(payload.config, 'config');
  const themeId = Number(config.themeId);
  if (!Number.isInteger(themeId) || themeId <= 0) {
    throw new ApiError('INVALID_REQUEST', 'config.themeId must be a positive integer', 400);
  }
  if (!Array.isArray(config.sizes) || config.sizes.length === 0) {
    throw new ApiError('INVALID_REQUEST', 'config.sizes must be a non-empty array', 400);
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
