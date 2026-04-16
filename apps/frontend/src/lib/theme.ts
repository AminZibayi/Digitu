export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export function normalizeThemePreference(value: unknown): ThemePreference {
  if (value === 'system' || value === 'light' || value === 'dark') {
    return value;
  }
  return 'system';
}

export function resolveTheme(preference: ThemePreference, systemPrefersDark: boolean | null): ResolvedTheme {
  if (preference === 'light' || preference === 'dark') {
    return preference;
  }
  if (systemPrefersDark == null) {
    return 'light';
  }
  return systemPrefersDark ? 'dark' : 'light';
}
