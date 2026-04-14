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
    const { api } = await import('../apps/frontend/src/lib/api');
    const stats = await api.getStats();

    expect(stats).toEqual(electronStats);
    expect(getStats).toHaveBeenCalledTimes(1);
    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
