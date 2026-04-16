import { describe, expect, it } from 'vitest';
import { parseRunUploadInput, parseRunVariantCreationInput } from '../apps/desktop/src/ipcContracts';

describe('ipc contracts', () => {
  it('rejects empty csv path', () => {
    expect(() => parseRunUploadInput('')).toThrow(/csvPath/i);
  });

  it('parses valid variant creation input', () => {
    const products = [{ productId: 1, productTitle: 'Test' }];
    const config = {
      themeId: 1,
      sizes: [{ key: '100x70', themeValueId: 2, price: 10000 }],
    };
    const result = parseRunVariantCreationInput(products, config, true);
    expect(result.products).toHaveLength(1);
    expect(result.dryRun).toBe(true);
  });

  it('rejects invalid products in variant creation', () => {
    expect(() => parseRunVariantCreationInput([], {}, false)).toThrow(/products/i);
  });
});
