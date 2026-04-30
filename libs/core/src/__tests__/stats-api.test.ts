import { describe, expect, it } from 'vitest';
import { buildStatsPayload, loadStatsPayload } from '../stats';

describe('stats payload', () => {
  it('exports stats loader from core package entrypoint', async () => {
    const core = await import('../');
    expect(typeof core.loadStatsPayload).toBe('function');
  });

  it('returns required dashboard counters', () => {
    const result = buildStatsPayload({
      productsUploaded: 3,
      variantsCreated: 7,
      lastRunAt: '2026-01-01T00:00:00.000Z',
    });
    expect(result.productsUploaded).toBe(3);
    expect(result.variantsCreated).toBe(7);
    expect(result.lastRunAt).toBeTruthy();
  });

  it('surfaces database failures instead of silently returning zero stats', async () => {
    await expect(loadStatsPayload('Z:\\path\\that\\does\\not\\exist\\digikala-auto.pglite')).rejects.toThrow();
  });
});