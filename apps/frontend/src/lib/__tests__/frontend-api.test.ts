import { afterEach, describe, expect, it, vi } from 'vitest';

const electronStats = {
  productsUploaded: 11,
  variantsCreated: 4,
  lastRunAt: '2026-02-10T00:00:00.000Z',
};

describe('frontend api transport', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete (globalThis as { window?: unknown }).window;
  });

  it('uses electronAPI for getStats in electron mode', async () => {
    const getStats = vi.fn().mockResolvedValue(electronStats);
    vi.stubGlobal('window', { electronAPI: { getStats } });
    const fetchSpy = vi.fn();
     vi.stubGlobal('fetch', fetchSpy);

     vi.resetModules();
     const { api } = await import('../api');
     const stats = await api.getStats();

    expect(stats).toEqual(electronStats);
    expect(getStats).toHaveBeenCalledTimes(1);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

    it('throws typed error details from http error envelope', async () => {
      vi.stubGlobal('window', {} as Window);
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          error: { code: 'INVALID_REQUEST', message: 'csvPath is required' },
        }),
      }));

      vi.resetModules();
      const { api } = await import('../api');

      await expect(api.runUpload('')).rejects.toMatchObject({
        code: 'INVALID_REQUEST',
        message: 'csvPath is required',
      });
    });

    it('keeps backend english message for unknown code', async () => {
      vi.stubGlobal('window', {} as Window);
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({
          success: false,
          error: { code: 'UNKNOWN_FUTURE_CODE', message: 'Future backend error text' },
        }),
      }));

      vi.resetModules();
      const { api } = await import('../api');

      await expect(api.getStats()).rejects.toMatchObject({
        code: 'UNKNOWN_FUTURE_CODE',
        message: 'Future backend error text',
      });
    });
});