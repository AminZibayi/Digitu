import { describe, expect, it } from 'vitest';
import { parseRunUploadInput } from '../apps/desktop/src/ipcContracts';

describe('ipc contracts', () => {
  it('rejects empty csv path', () => {
    expect(() => parseRunUploadInput('')).toThrow(/csvPath/i);
  });
});