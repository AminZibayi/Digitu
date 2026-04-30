import { describe, expect, it } from 'vitest';
import {
  buildNormalizedSettingsPayload,
  parseUploadRequest,
  parseVariantCreationRequest,
} from '../requestValidation';

describe('requestValidation', () => {
  it('parses a valid upload request', () => {
    const parsed = parseUploadRequest({ csvPath: 'C:\\data\\products.csv' });
    expect(parsed.csvPath).toBe('C:\\data\\products.csv');
  });

  it('rejects upload request without csvPath', () => {
    expect(() => parseUploadRequest({})).toThrow(/csvPath/i);
  });

  it('parses valid variant creation payload', () => {
    const parsed = parseVariantCreationRequest({
      dryRun: true,
      fixture: 'some-fixture-id',
      config: { themeId: 1, sizes: [{ key: '100x70', themeValueId: 2, price: 10000 }] },
    });

    expect(parsed.dryRun).toBe(true);
    expect(parsed.fixture).toBe('some-fixture-id');
  });

  it('rejects variant creation payload with invalid config', () => {
    expect(() =>
      parseVariantCreationRequest({
        dryRun: false,
        fixture: 'some-fixture-id',
        config: { themeId: 0, sizes: [] },
      }),
    ).toThrow(/config/i);
  });

  it('keeps existing cookie when payload cookie is empty', () => {
    const normalized = buildNormalizedSettingsPayload(
      {
        cookie: '   ',
        baseUrl: 'https://seller.digikala.com/api/v2',
      },
      'existing-cookie',
    );
    expect(normalized.cookie).toBe('existing-cookie');
  });

  it('rejects settings payload when cookie is missing and no existing cookie is available', () => {
    expect(() => buildNormalizedSettingsPayload({}, null)).toThrow(/cookie/i);
  });
});