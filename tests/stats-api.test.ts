import { describe, expect, it } from 'vitest';
import { buildStatsPayload } from '../packages/core/src/stats';

describe('stats payload', () => {
  it('returns required dashboard counters', () => {
    const input = {
      productsUploaded: 3,
      variantsCreated: 7,
      lastRunAt: '2026-01-01T00:00:00.000Z',
    };
    const result = buildStatsPayload(input);
    expect(result.productsUploaded).toBe(3);
    expect(result.variantsCreated).toBe(7);
    expect(result.lastRunAt).toBe(input.lastRunAt);
  });
});
