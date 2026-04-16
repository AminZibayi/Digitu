# Theme + Persian RTL + Error Codes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `system/light/dark` theme switching (with light fallback), full Persian RTL UI, and backend `{ code, message }` error contracts consumed through a Persian error dictionary in frontend.

**Architecture:** Introduce small shared utilities: backend `ApiError` envelope helper, frontend `ApiRequestError` + dictionary mapping, and a client `ThemeProvider` with `data-theme` CSS tokens. Keep existing route/page structure and translate in place. Verify behavior with repo tests and Playwright MCP visual captures.

**Tech Stack:** TypeScript, Next.js 14, React 18, Express, Vitest, Tailwind/CSS variables, Playwright MCP

---

### Task 1: Standardize backend error envelope (`code` + English `message`)

**Files:**
- Create: `apps/backend/src/apiError.ts`
- Modify: `apps/backend/src/requestValidation.ts`
- Test: `tests/request-validation.test.ts`
- Test: `tests/backend-api-error.test.ts`

- [ ] **Step 1: Write failing tests for structured API errors**

```ts
// tests/backend-api-error.test.ts
import { describe, expect, it } from 'vitest';
import { ApiError, toApiErrorPayload } from '../apps/backend/src/apiError';

describe('apiError helpers', () => {
  it('preserves code/message/status from ApiError', () => {
    const err = new ApiError('INVALID_REQUEST', 'csvPath is required', 400);
    expect(toApiErrorPayload(err, 'INTERNAL_ERROR', 'Internal server error', 500)).toEqual({
      code: 'INVALID_REQUEST',
      message: 'csvPath is required',
      status: 400,
    });
  });

  it('uses fallback code with real Error message', () => {
    const err = new Error('Upload failed');
    expect(toApiErrorPayload(err, 'UPLOAD_FAILED', 'Upload failed', 500)).toEqual({
      code: 'UPLOAD_FAILED',
      message: 'Upload failed',
      status: 500,
    });
  });
});
```

Run: `pnpm test -- --run tests/backend-api-error.test.ts`
Expected: FAIL because `apiError.ts` does not exist.

- [ ] **Step 2: Implement backend error helper**

```ts
// apps/backend/src/apiError.ts
export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  status: number;
}

export function toApiErrorPayload(
  error: unknown,
  fallbackCode: string,
  fallbackMessage: string,
  fallbackStatus: number,
): ApiErrorPayload {
  if (error instanceof ApiError) {
    return { code: error.code, message: error.message, status: error.status };
  }
  if (error instanceof Error) {
    return { code: fallbackCode, message: error.message || fallbackMessage, status: fallbackStatus };
  }
  return { code: fallbackCode, message: fallbackMessage, status: fallbackStatus };
}
```

- [ ] **Step 3: Make request validation throw typed API errors**

```ts
// apps/backend/src/requestValidation.ts (key change)
import { ApiError } from './apiError';

function asRecord(value: unknown, context: string): GenericRecord {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new ApiError('INVALID_REQUEST', `${context} must be an object`, 400);
  }
  return value as GenericRecord;
}

function asNonEmptyString(value: unknown, field: string): string {
  const normalized = String(value ?? '').trim();
  if (!normalized) {
    throw new ApiError('INVALID_REQUEST', `${field} is required`, 400);
  }
  return normalized;
}
```

- [ ] **Step 4: Update validation tests to assert English message + code behavior indirectly**

```ts
// tests/request-validation.test.ts (add one case)
it('throws invalid request error for missing csvPath', () => {
  expect(() => parseUploadRequest({})).toThrow(/csvPath is required/i);
});
```

Run: `pnpm test -- --run tests/request-validation.test.ts tests/backend-api-error.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/backend/src/apiError.ts apps/backend/src/requestValidation.ts tests/request-validation.test.ts tests/backend-api-error.test.ts
git commit -m "feat: add backend api error envelope helpers"
```

---

### Task 2: Return structured backend errors and consume them in frontend transport

**Files:**
- Modify: `apps/backend/src/index.ts`
- Modify: `apps/frontend/src/app/globals.d.ts`
- Modify: `apps/frontend/src/lib/api.ts`
- Test: `tests/frontend-api.test.ts`

- [ ] **Step 1: Write failing frontend transport test for `{ code, message }` errors**

```ts
// tests/frontend-api.test.ts (add case)
it('throws ApiRequestError with code from HTTP error envelope', async () => {
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
  const { api } = await import('../apps/frontend/src/lib/api');
  await expect(api.runUpload('')).rejects.toMatchObject({
    code: 'INVALID_REQUEST',
    message: 'csvPath is required',
  });
});
```

Run: `pnpm test -- --run tests/frontend-api.test.ts`
Expected: FAIL because current `fetchJson` only handles string errors.

- [ ] **Step 2: Wire backend route catches through `toApiErrorPayload`**

```ts
// apps/backend/src/index.ts (pattern in each catch block)
import { ApiError, toApiErrorPayload } from './apiError';

const errorPayload = toApiErrorPayload(error, 'UPLOAD_FAILED', 'Upload failed', 500);
res.status(errorPayload.status).json({
  success: false,
  error: { code: errorPayload.code, message: errorPayload.message },
});
```

Also throw typed settings-not-configured error:

```ts
if (!settings) {
  throw new ApiError(
    'SETTINGS_NOT_CONFIGURED',
    'Digikala settings are not configured. Open Settings and save credentials first.',
    400,
  );
}
```

- [ ] **Step 3: Add typed API error shape and `ApiRequestError` class in frontend**

```ts
// apps/frontend/src/app/globals.d.ts
export interface ApiErrorResponse {
  code?: string;
  message?: string;
}
```

```ts
// apps/frontend/src/lib/api.ts (core transport change)
export class ApiRequestError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

const errorCode = typeof json?.error?.code === 'string' ? json.error.code : 'UNKNOWN_ERROR';
const errorMessage = typeof json?.error?.message === 'string'
  ? json.error.message
  : (typeof json?.error === 'string' ? json.error : `Request failed: ${res.status}`);
throw new ApiRequestError(errorCode, errorMessage);
```

- [ ] **Step 4: Run backend + frontend tests**

Run: `pnpm test -- --run tests/backend-api-error.test.ts tests/request-validation.test.ts tests/frontend-api.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/backend/src/index.ts apps/frontend/src/app/globals.d.ts apps/frontend/src/lib/api.ts tests/frontend-api.test.ts
git commit -m "feat: standardize api error contract across backend and frontend"
```

---

### Task 3: Implement theme system (`system/light/dark`) with light fallback and RTL root

**Files:**
- Create: `apps/frontend/src/lib/theme.ts`
- Create: `apps/frontend/src/components/ThemeProvider.tsx`
- Modify: `apps/frontend/src/app/layout.tsx`
- Modify: `apps/frontend/src/components/Sidebar.tsx`
- Modify: `apps/frontend/src/app/globals.css`
- Test: `tests/theme-utils.test.ts`

- [ ] **Step 1: Write failing theme utility tests**

```ts
// tests/theme-utils.test.ts
import { describe, expect, it } from 'vitest';
import { normalizeThemePreference, resolveTheme } from '../apps/frontend/src/lib/theme';

describe('theme utils', () => {
  it('defaults invalid preference to system', () => {
    expect(normalizeThemePreference('abc')).toBe('system');
  });

  it('resolves system to light when system preference unavailable', () => {
    expect(resolveTheme('system', null)).toBe('light');
  });

  it('resolves explicit dark without system lookup', () => {
    expect(resolveTheme('dark', false)).toBe('dark');
  });
});
```

Run: `pnpm test -- --run tests/theme-utils.test.ts`
Expected: FAIL because `theme.ts` does not exist.

- [ ] **Step 2: Add theme utility module**

```ts
// apps/frontend/src/lib/theme.ts
export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export function normalizeThemePreference(value: unknown): ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
}

export function resolveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean | null,
): ResolvedTheme {
  if (preference === 'light' || preference === 'dark') return preference;
  if (systemPrefersDark == null) return 'light';
  return systemPrefersDark ? 'dark' : 'light';
}
```

- [ ] **Step 3: Add provider and mount in RTL Persian layout**

```tsx
// apps/frontend/src/components/ThemeProvider.tsx
'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { normalizeThemePreference, resolveTheme, ThemePreference } from '../lib/theme';

const STORAGE_KEY = 'dk-theme-preference';
interface ThemeContextValue {
  preference: ThemePreference;
  resolvedTheme: 'light' | 'dark';
  setPreference: (next: ThemePreference) => void;
}
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = normalizeThemePreference(localStorage.getItem(STORAGE_KEY));
    setPreference(saved);
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!media) return;
    setSystemPrefersDark(media.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const resolvedTheme = resolveTheme(preference, systemPrefersDark);
  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    localStorage.setItem(STORAGE_KEY, preference);
  }, [preference, resolvedTheme]);

  const value = useMemo(() => ({ preference, resolvedTheme, setPreference }), [preference, resolvedTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
```

```tsx
// apps/frontend/src/app/layout.tsx
<html lang="fa" dir="rtl">
  <body className="flex h-screen overflow-hidden">
    <ThemeProvider>
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-[var(--background)]">{children}</main>
    </ThemeProvider>
  </body>
</html>
```

- [ ] **Step 4: Add sidebar control and CSS theme tokens**

```tsx
// apps/frontend/src/components/Sidebar.tsx (theme control snippet)
<label className="text-xs text-[var(--foreground-muted)]">تم</label>
<select
  value={theme.preference}
  onChange={(e) => theme.setPreference(normalizeThemePreference(e.target.value))}
  className="w-full mt-1 bg-[var(--surface-alt)] border border-[var(--border)] rounded-lg px-2 py-1.5 text-sm"
>
  <option value="system">سیستم</option>
  <option value="light">روشن</option>
  <option value="dark">تیره</option>
</select>
```

```css
/* apps/frontend/src/app/globals.css */
:root {
  --background: #f6f7fb;
  --surface: #ffffff;
  --surface-alt: #f1f3f9;
  --border: rgba(15, 23, 42, 0.12);
  --accent: #ef394e;
  --accent-glow: rgba(239, 57, 78, 0.18);
  --accent-secondary: #7c5cbf;
  --foreground: #1f2937;
  --foreground-muted: #667085;
}
[data-theme="dark"] {
  --background: #0f0f13;
  --surface: #1a1a24;
  --surface-alt: #22223a;
  --border: rgba(255, 255, 255, 0.08);
  --accent: #ef394e;
  --accent-glow: rgba(239, 57, 78, 0.25);
  --accent-secondary: #7c5cbf;
  --foreground: #f0f0f5;
  --foreground-muted: #8888a0;
}
```

- [ ] **Step 5: Run tests and commit**

Run: `pnpm test -- --run tests/theme-utils.test.ts tests/frontend-api.test.ts`
Expected: PASS.

```bash
git add apps/frontend/src/lib/theme.ts apps/frontend/src/components/ThemeProvider.tsx apps/frontend/src/app/layout.tsx apps/frontend/src/components/Sidebar.tsx apps/frontend/src/app/globals.css tests/theme-utils.test.ts
git commit -m "feat: add rtl-aware system-light-dark theme support"
```

---

### Task 4: Translate visible UI strings to Persian and map backend codes via dictionary

**Files:**
- Create: `apps/frontend/src/lib/errorDictionary.ts`
- Modify: `apps/frontend/src/app/page.tsx`
- Modify: `apps/frontend/src/app/settings/page.tsx`
- Modify: `apps/frontend/src/app/uploader/page.tsx`
- Modify: `apps/frontend/src/app/variants/page.tsx`
- Modify: `apps/frontend/src/app/console/page.tsx`
- Modify: `apps/frontend/src/components/Sidebar.tsx`
- Test: `tests/frontend-api.test.ts`

- [ ] **Step 1: Add dictionary and resolver helper**

```ts
// apps/frontend/src/lib/errorDictionary.ts
const FA_ERROR_MESSAGES: Record<string, string> = {
  INVALID_REQUEST: 'درخواست نامعتبر است.',
  SETTINGS_NOT_CONFIGURED: 'تنظیمات هنوز پیکربندی نشده است.',
  SETTINGS_SAVE_FAILED: 'ذخیره تنظیمات ناموفق بود.',
  SETTINGS_LOAD_FAILED: 'بارگذاری تنظیمات ناموفق بود.',
  UPLOAD_FAILED: 'آپلود ناموفق بود.',
  VARIANT_CREATION_FAILED: 'ساخت تنوع‌ها ناموفق بود.',
  STATS_LOAD_FAILED: 'بارگذاری آمار ناموفق بود.',
};

export function resolvePersianErrorMessage(code: string | undefined, englishMessage: string): string {
  if (code && FA_ERROR_MESSAGES[code]) return FA_ERROR_MESSAGES[code];
  return englishMessage;
}
```

- [ ] **Step 2: Update API tests for fallback behavior**

```ts
// tests/frontend-api.test.ts (add case)
it('keeps backend english message when code is unknown', async () => {
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
  const { api } = await import('../apps/frontend/src/lib/api');
  await expect(api.getStats()).rejects.toMatchObject({
    code: 'UNKNOWN_FUTURE_CODE',
    message: 'Future backend error text',
  });
});
```

Run: `pnpm test -- --run tests/frontend-api.test.ts`
Expected: FAIL until dictionary wiring is complete.

- [ ] **Step 3: Translate all page strings to Persian**

```tsx
// apps/frontend/src/components/Sidebar.tsx (nav labels + footer)
const nav = [
  { href: '/', label: 'داشبورد', icon: '⬛' },
  { href: '/settings', label: 'تنظیمات', icon: '⚙️' },
  { href: '/uploader', label: 'آپلود محصولات', icon: '📤' },
  { href: '/variants', label: 'ایجاد تنوع', icon: '🧩' },
  { href: '/console', label: 'کنسول زنده', icon: '📋' },
];
```

```tsx
// apps/frontend/src/app/page.tsx (example replacements)
<h1 className="text-2xl font-bold text-[var(--foreground)]">داشبورد</h1>
<a href="/uploader" className="btn-primary w-full text-center">باز کردن آپلودر</a>
<a href="/variants" className="btn-primary w-full text-center">باز کردن سازنده تنوع</a>
```

```tsx
// apps/frontend/src/app/settings/page.tsx (error mapping snippet)
import { ApiRequestError } from '../../lib/api';
import { resolvePersianErrorMessage } from '../../lib/errorDictionary';

} catch (error: unknown) {
  if (error instanceof ApiRequestError) {
    setStatus(`❌ ${resolvePersianErrorMessage(error.code, error.message)}`);
  } else {
    const message = error instanceof Error ? error.message : 'خطا در ذخیره تنظیمات';
    setStatus(`❌ ${message}`);
  }
}
```

```tsx
// apps/frontend/src/app/console/page.tsx (empty states)
{logs.length === 0 ? 'در انتظار دریافت لاگ از بک‌اند…' : 'لاگی با فیلتر فعلی یافت نشد.'}
```

- [ ] **Step 4: Run full test suite**

Run: `pnpm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/frontend/src/lib/errorDictionary.ts apps/frontend/src/app/page.tsx apps/frontend/src/app/settings/page.tsx apps/frontend/src/app/uploader/page.tsx apps/frontend/src/app/variants/page.tsx apps/frontend/src/app/console/page.tsx apps/frontend/src/components/Sidebar.tsx tests/frontend-api.test.ts
git commit -m "feat: localize ui to persian and map api errors by code"
```

---

### Task 5: Playwright MCP visual verification (RTL + theme states)

**Files:**
- Create: `docs/superpowers/artifacts/2026-04-16-theme-rtl-visual-checklist.txt`
- Create screenshots under: `docs/superpowers/artifacts/visuals/`

- [ ] **Step 1: Launch app for visual checks**

Run:

```bash
pnpm dev
```

Expected: frontend available on local URL.

- [ ] **Step 2: Capture RTL Persian + Light screenshots**

Pages to capture:
- `/`
- `/settings`
- `/uploader`
- `/variants`
- `/console`

Expected: Persian text visible, sidebar on right, light palette active.

- [ ] **Step 3: Capture Dark and System screenshots**

Use sidebar theme control:
- set `dark`, capture all pages
- set `system`, verify resolved mode; if system detection is unavailable, verify light fallback and capture

Expected: Theme state persists across route changes; fallback behavior is visible.

- [ ] **Step 4: Record checklist results**

```txt
PASS: rtl-layout
PASS: persian-copy
PASS: light-theme
PASS: dark-theme
PASS: system-fallback-light
```

- [ ] **Step 5: Commit artifacts**

```bash
git add docs/superpowers/artifacts/2026-04-16-theme-rtl-visual-checklist.txt docs/superpowers/artifacts/visuals
git commit -m "test: add playwright mcp visual verification artifacts"
```

