import { describe, expect, it } from 'vitest';
import {
  parseRunUploadInput,
  parseRunVariantCreationInput,
  parseSaveSettingsInput,
  toIpcErrorEnvelope,
} from '../ipcContracts';

describe('ipc contracts', () => {
  it('rejects empty csv path', () => {
    expect(() => parseRunUploadInput('')).toThrow(/csvPath/i);
  });

  it('uses existing cookie when incoming cookie is empty', () => {
    const parsed = parseSaveSettingsInput({ cookie: '   ', timeoutMs: 1000 }, 'existing-cookie');
    expect(parsed.cookie).toBe('existing-cookie');
    expect(parsed.timeoutMs).toBe(1000);
  });

  it('keeps incoming cookie when provided', () => {
    const parsed = parseSaveSettingsInput({ cookie: 'new-cookie' }, 'existing-cookie');
    expect(parsed.cookie).toBe('new-cookie');
  });

  it('wraps invalid save-settings input in stable error envelope', () => {
    const result = (() => {
      try {
        parseSaveSettingsInput(null, null);
        return { success: true };
      } catch (error: unknown) {
        return toIpcErrorEnvelope(error, 'Failed to save settings');
      }
    })();

    expect(result).toEqual({
      success: false,
      error: 'settings must be an object',
    });
  });

  it('rejects variant creation with empty products', () => {
    expect(() =>
      parseRunVariantCreationInput(
        [],
        { themeId: 1, sizes: [{ key: 'S', themeValueId: 10, price: 1000 }] },
        false,
      ),
    ).toThrow(/products must be a non-empty array/i);
  });

  it('rejects variant creation with invalid theme', () => {
    expect(() =>
      parseRunVariantCreationInput(
        [{ productId: 1, productTitle: 'product' }],
        { themeId: 0, sizes: [{ key: 'S', themeValueId: 10, price: 1000 }] },
        false,
      ),
    ).toThrow(/config\.themeId must be a positive integer/i);
  });

  it('rejects variant creation with invalid size item', () => {
    expect(() =>
      parseRunVariantCreationInput(
        [{ productId: 1, productTitle: 'product' }],
        { themeId: 1, sizes: [{ key: '', themeValueId: 10, price: 1000 }] },
        false,
      ),
    ).toThrow(/config\.sizes\[0\]\.key is required/i);
  });

  it('parses valid variant creation input', () => {
    const parsed = parseRunVariantCreationInput(
      [{ productId: '12', productTitle: ' Demo Product ' }],
      { themeId: '2', sizes: [{ key: 'L', themeValueId: 25, price: 199000 }] },
      true,
    );

    expect(parsed).toEqual({
      products: [{ productId: 12, productTitle: 'Demo Product' }],
      config: { themeId: '2', sizes: [{ key: 'L', themeValueId: 25, price: 199000 }] },
      dryRun: true,
    });
  });
});