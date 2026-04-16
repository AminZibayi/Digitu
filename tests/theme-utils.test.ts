import { describe, expect, it } from 'vitest';
import { normalizeThemePreference, resolveTheme } from '../apps/frontend/src/lib/theme';

describe('theme utils', () => {
  it('defaults invalid preference to system', () => {
    expect(normalizeThemePreference('abc')).toBe('system');
  });

  it('resolves system to light when system preference is unavailable', () => {
    expect(resolveTheme('system', null)).toBe('light');
  });

  it('resolves explicit dark preference directly', () => {
    expect(resolveTheme('dark', false)).toBe('dark');
  });
});
