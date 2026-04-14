export interface DigikalaSettings {
  cookie: string;
  baseUrl: string;
  referer: string;
  timeoutMs: number;
  maxRetries: number;
  retryDelayMs: number;
}

export interface DigikalaSettingsInput {
  cookie?: unknown;
  baseUrl?: unknown;
  referer?: unknown;
  timeoutMs?: unknown;
  maxRetries?: unknown;
  retryDelayMs?: unknown;
}

export function normalizeDigikalaSettings(input: DigikalaSettingsInput): DigikalaSettings {
  const cookie = String(input.cookie ?? '').trim();
  if (!cookie) {
    throw new Error('Cookie is required.');
  }

  const baseUrl = String(input.baseUrl ?? 'https://seller.digikala.com/api/v2').trim().replace(/\/$/, '');
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    throw new Error('baseUrl must start with http:// or https://');
  }

  const referer = String(input.referer ?? 'https://seller.digikala.com/pwa/').trim();
  if (!referer.startsWith('http://') && !referer.startsWith('https://')) {
    throw new Error('referer must start with http:// or https://');
  }

  const timeoutMs = toPositiveInteger(input.timeoutMs, 20000, 'timeoutMs');
  const maxRetries = toPositiveInteger(input.maxRetries, 3, 'maxRetries');
  const retryDelayMs = toPositiveInteger(input.retryDelayMs, 600, 'retryDelayMs');

  return {
    cookie,
    baseUrl,
    referer,
    timeoutMs,
    maxRetries,
    retryDelayMs,
  };
}

function toPositiveInteger(value: unknown, defaultValue: number, fieldName: string): number {
  if (value === undefined || value === null || String(value).trim() === '') {
    return defaultValue;
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${fieldName} must be a positive integer`);
  }
  return parsed;
}
