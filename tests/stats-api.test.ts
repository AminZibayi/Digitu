import { describe, expect, it } from 'vitest';
import { buildStatsPayload, loadStatsPayload } from '../apps/backend/src/stats';

describe('stats payload', () => {
  it('returns required dashboard counters', () => {
    const result = buildStatsPayload({ productsUploaded: 3, variantsCreated: 7, lastRunAt: '2026-01-01T00:00:00.000Z' });
    expect(result.productsUploaded).toBe(3);
    expect(result.variantsCreated).toBe(7);
    expect(result.lastRunAt).toBeTruthy();
  });

  it('surfaces database failures instead of silently returning zero stats', () => {
    expect(() => loadStatsPayload('Z:\\path\\that\\does\\not\\exist\\digikala-auto.sqlite')).toThrow();
  });
});
