# Desktop Architecture Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the existing Electron + Next static desktop architecture into a reliable production-ready desktop runtime with validated IPC, operational UI signals, and stable packaging behavior.

**Architecture:** Keep the current monorepo structure and desktop-first runtime. Tighten boundaries at IPC/API edges, wire dashboard/runtime status from real data, and improve native-module startup diagnostics and packaging defaults. Changes are incremental and behavior-safe.

**Tech Stack:** Electron 33, Next.js 14 static export, TypeScript, Express, better-sqlite3, Vitest, Playwright MCP.

---

### Task 1: Native Runtime Readiness Guard

**Files:**
- Create: `apps\desktop\src\runtimeReadiness.ts`
- Modify: `apps\desktop\src\main.ts`
- Test: `tests\runtime-readiness.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { describe, expect, it } from 'vitest';
import { formatNativeModuleReadinessError } from '../apps/desktop/src/runtimeReadiness';

describe('runtime readiness', () => {
  it('formats ABI mismatch with actionable message', () => {
    const msg = formatNativeModuleReadinessError('NODE_MODULE_VERSION 130 ... requires 137');
    expect(msg).toMatch(/native module ABI mismatch/i);
    expect(msg).toMatch(/rebuild/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/runtime-readiness.test.ts`  
Expected: FAIL with module/file missing error.

- [ ] **Step 3: Write minimal implementation**

```ts
export function formatNativeModuleReadinessError(raw: string): string {
  if (/NODE_MODULE_VERSION/i.test(raw)) {
    return 'Native module ABI mismatch detected. Rebuild native dependencies for the current runtime.';
  }
  return 'Native module failed to load.';
}
```

- [ ] **Step 4: Wire startup guard in Electron main**

```ts
try {
  const db = new Database(dbPath);
} catch (error) {
  dialog.showErrorBox('Startup Error', formatNativeModuleReadinessError(String(error)));
  app.quit();
}
```

- [ ] **Step 5: Run tests/build and commit**

Run: `pnpm test tests/runtime-readiness.test.ts && pnpm --filter @digikala/desktop build`  
Expected: PASS and desktop compile succeeds.

```bash
git add tests/runtime-readiness.test.ts apps/desktop/src/runtimeReadiness.ts apps/desktop/src/main.ts
git commit -m "feat: add desktop runtime readiness guard"
```

### Task 2: Dashboard Live Metrics Wiring

**Files:**
- Create: `apps\backend\src\stats.ts`
- Modify: `apps\backend\src\index.ts`
- Modify: `apps\frontend\src\app\page.tsx`
- Modify: `apps\frontend\src\lib\api.ts`
- Test: `tests\stats-api.test.ts`

- [ ] **Step 1: Write failing backend stats API test**

```ts
import { describe, expect, it } from 'vitest';
import { buildStatsPayload } from '../apps/backend/src/stats';

describe('stats payload', () => {
  it('returns required dashboard counters', () => {
    const result = buildStatsPayload({ productsUploaded: 3, variantsCreated: 7, lastRunAt: '2026-01-01T00:00:00.000Z' });
    expect(result.productsUploaded).toBe(3);
    expect(result.variantsCreated).toBe(7);
    expect(result.lastRunAt).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/stats-api.test.ts`  
Expected: FAIL with missing module/function.

- [ ] **Step 3: Implement backend stats function and route**

```ts
export function buildStatsPayload(input: { productsUploaded: number; variantsCreated: number; lastRunAt: string | null }) {
  return input;
}
```

Add route:

```ts
app.get('/api/stats', (_req, res) => {
  res.json({ success: true, stats: buildStatsPayload(/* DB-derived values */) });
});
```

- [ ] **Step 4: Implement frontend consumption**

```ts
getStats: async () => {
  const json = await fetchJson<{ success: true; stats: { productsUploaded: number; variantsCreated: number; lastRunAt: string | null } }>('/api/stats');
  return json.stats;
}
```

Update dashboard to render fetched values instead of placeholders.

- [ ] **Step 5: Run tests/build and commit**

Run: `pnpm test tests/stats-api.test.ts && pnpm build`  
Expected: PASS.

```bash
git add apps/backend/src/stats.ts apps/backend/src/index.ts apps/frontend/src/lib/api.ts apps/frontend/src/app/page.tsx tests/stats-api.test.ts
git commit -m "feat: wire dashboard to live backend stats"
```

### Task 3: IPC Contract Tightening and Type Safety

**Files:**
- Create: `apps\desktop\src\ipcContracts.ts`
- Modify: `apps\desktop\src\main.ts`
- Modify: `apps\desktop\src\preload.ts`
- Modify: `apps\frontend\src\app\globals.d.ts`
- Test: `tests\ipc-contracts.test.ts`

- [ ] **Step 1: Write failing IPC contract test**

```ts
import { describe, expect, it } from 'vitest';
import { parseRunUploadInput } from '../apps/desktop/src/ipcContracts';

describe('ipc contracts', () => {
  it('rejects empty csv path', () => {
    expect(() => parseRunUploadInput('')).toThrow(/csvPath/i);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/ipc-contracts.test.ts`  
Expected: FAIL with missing module/function.

- [ ] **Step 3: Implement minimal parser utilities**

```ts
export function parseRunUploadInput(csvPath: unknown): string {
  const value = String(csvPath ?? '').trim();
  if (!value) throw new Error('csvPath is required');
  return value;
}
```

- [ ] **Step 4: Wire all IPC handlers to parser functions**

Use parser functions before invoking services in `main.ts`; keep returned envelopes `{ success, error? }` stable.

- [ ] **Step 5: Run tests/build and commit**

Run: `pnpm test tests/ipc-contracts.test.ts && pnpm --filter @digikala/desktop build && pnpm --filter @digikala/frontend build`  
Expected: PASS.

```bash
git add apps/desktop/src/ipcContracts.ts apps/desktop/src/main.ts apps/desktop/src/preload.ts apps/frontend/src/app/globals.d.ts tests/ipc-contracts.test.ts
git commit -m "refactor: centralize ipc input contracts"
```

### Task 4: Packaging Hardening Baseline

**Files:**
- Modify: `apps\desktop\package.json`
- Create: `apps\desktop\build\README.md` (packaging notes)
- Test: N/A (validated by build command)

- [ ] **Step 1: Add missing app metadata and safer packaging defaults**

Update package fields:

```json
{
  "description": "Digikala product and variant desktop automation suite",
  "author": "Digikala Automation Team"
}
```

Set build posture (keep native compatibility explicit):

```json
{
  "build": {
    "asar": true,
    "asarUnpack": ["**/*.node"]
  }
}
```

- [ ] **Step 2: Add packaging runbook notes**

Create `apps/desktop/build/README.md` with:
- local packaging command
- signed/unsigned artifact expectations
- native module troubleshooting section

- [ ] **Step 3: Run packaging verification**

Run: `pnpm --filter @digikala/desktop build`  
Expected: Windows unpacked artifact generated with no blocking errors.

- [ ] **Step 4: Commit**

```bash
git add apps/desktop/package.json apps/desktop/build/README.md
git commit -m "chore: harden desktop packaging defaults"
```

### Task 5: End-to-End and Visual Acceptance

**Files:**
- Modify: `tests\request-validation.test.ts` (if needed for new behavior)
- Use artifacts: `e2e-dashboard.png`, `e2e-settings.png`, `e2e-uploader.png`, `e2e-variants.png`, `e2e-console.png`

- [ ] **Step 1: Run full test/build**

Run: `pnpm test && pnpm build`  
Expected: all suites and build stages pass.

- [ ] **Step 2: Run Playwright acceptance flow**

Run MCP flow over routes:
- `/`
- `/settings/`
- `/uploader/`
- `/variants/`
- `/console/`

Expected: navigation works, forms submit, error states are actionable when backend unavailable.

- [ ] **Step 3: Capture visual artifacts**

Capture full-page screenshots:
- `e2e-dashboard.png`
- `e2e-settings.png`
- `e2e-uploader.png`
- `e2e-variants.png`
- `e2e-console.png`

- [ ] **Step 4: Commit**

```bash
git add tests/request-validation.test.ts
git commit -m "test: finalize desktop e2e and visual acceptance"
```

