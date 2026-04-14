import { describe, expect, it } from 'vitest';
import {
  buildNormalizedSettingsPayload,
  parseUploadRequest,
  parseVariantCreationRequest,
} from '../apps/backend/src/requestValidation';

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
      products: [{ productId: 1, productTitle: 'A' }],
      config: { themeId: 1, sizes: [{ key: '100x70', themeValueId: 2, price: 10000 }] },
    });

    expect(parsed.dryRun).toBe(true);
    expect(parsed.products).toHaveLength(1);
  });

  it('rejects variant creation payload with invalid products', () => {
    expect(() =>
      parseVariantCreationRequest({
        dryRun: false,
        products: [{ productId: 0, productTitle: '' }],
        config: { themeId: 1, sizes: [{ key: '100x70', themeValueId: 2, price: 10000 }] },
      }),
    ).toThrow(/products/i);
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
