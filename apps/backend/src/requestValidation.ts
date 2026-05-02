import { DigikalaSettingsInput, normalizeDigikalaSettings } from '@digikala/core';
import { ApiError } from './apiError';

type GenericRecord = Record<string, unknown>;

export interface ParsedUploadRequest {
  csvPath?: string;
  products?: any[];
  autoPublish: boolean;
  dryRun: boolean;
}

export interface ParsedVariantCreationRequest {
  fixture?: string;
  products?: any[];
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
  const csvPathRaw = String(payload.csvPath ?? '').trim();
  const csvPath = csvPathRaw || undefined;
  const products = Array.isArray(payload.products) ? payload.products : undefined;

  if (!csvPath && !products) {
    throw new ApiError('INVALID_REQUEST', 'csvPath or products is required', 400);
  }

  return {
    csvPath,
    products,
    autoPublish: Boolean(payload.autoPublish),
    dryRun: Boolean(payload.dryRun),
  };
}

export function parseVariantCreationRequest(body: unknown): ParsedVariantCreationRequest {
  const payload = asRecord(body, 'request body');

  const fixtureRaw = String(payload.fixture ?? '').trim();
  const fixture = fixtureRaw || undefined;
  const products = Array.isArray(payload.products) ? payload.products : undefined;

  if (!fixture && !products) {
    throw new ApiError('INVALID_REQUEST', 'fixture or products is required', 400);
  }

  const config = asRecord(payload.config, 'config');
  const themeId = Number(config.themeId);
  if (!Number.isInteger(themeId) || themeId <= 0) {
    throw new ApiError('INVALID_REQUEST', 'config.themeId must be a positive integer', 400);
  }
  if (!Array.isArray(config.sizes) || config.sizes.length === 0) {
    throw new ApiError('INVALID_REQUEST', 'config.sizes must be a non-empty array', 400);
  }

  return {
    fixture,
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