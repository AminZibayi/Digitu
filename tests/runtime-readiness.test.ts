import { describe, expect, it } from 'vitest';
import { formatNativeModuleReadinessError } from '../apps/desktop/src/runtimeReadiness';

describe('runtime readiness', () => {
  it('formats ABI mismatch with actionable message', () => {
    const msg = formatNativeModuleReadinessError('NODE_MODULE_VERSION 130 ... requires 137');
    expect(msg).toMatch(/native module ABI mismatch/i);
    expect(msg).toMatch(/rebuild/i);
  });
});
