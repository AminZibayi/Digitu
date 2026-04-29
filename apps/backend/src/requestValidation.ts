import { DigikalaSettingsInput, normalizeDigikalaSettings } from '@digikala/core';
import { ApiError } from './apiError';

type GenericRecord = Record<string, unknown>;

export interface ParsedUploadRequest {
  csvPath: string;
  autoPublish?: boolean;
}

export interface ParsedVariantCreationRequest {
  fixture: string;
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
    autoPublish: Boolean(payload.autoPublish),
  };
}

export function parseVariantCreationRequest(body: unknown): ParsedVariantCreationRequest {
  const payload = asRecord(body, 'request body');
  
  const fixture = asNonEmptyString(payload.fixture, 'fixture');

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
