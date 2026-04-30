# Auto-Generate Encryption Secret Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Auto-generate encryption secret on first startup so users don't need to set DIGIKALA_SETTINGS_SECRET env var.

**Architecture:** On startup, check if `data/.master-key` exists. If not, generate 32 random bytes via `crypto.randomBytes(32)` and store as hex. Load existing key on subsequent runs. Pass secret to SettingsStore.

**Tech Stack:** Node.js crypto module, existing SettingsStore class in apps/backend/src/

---

## File Structure

- `apps/backend/src/index.ts` - Modify to load/generate master key
- `apps/backend/src/masterKey.ts` - NEW: Handle master key loading/generation
- `.gitignore` - Add explicit `.master-key` entry for clarity

---

## Task 1: Create masterKey.ts utility

**Files:**
- Create: `apps/backend/src/masterKey.ts`
- Modify: none
- Test: none (utility function)

- [ ] **Step 1: Write the masterKey.ts utility**

```typescript
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export function getMasterKey(dataDir: string): string {
  const keyPath = path.join(dataDir, '.master-key');
  
  if (fs.existsSync(keyPath)) {
    return fs.readFileSync(keyPath, 'utf-8').trim();
  }
  
  const secret = crypto.randomBytes(32).toString('hex');
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(keyPath, secret, 'utf-8');
  return secret;
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/backend/src/masterKey.ts
git commit -m "feat(backend): add master key generation utility"
```

---

## Task 2: Update index.ts to use auto-generated secret

**Files:**
- Modify: `apps/backend/src/index.ts:60`
- Test: manual testing (run backend and save settings)

- [ ] **Step 1: Update imports in index.ts**

Add import for `getMasterKey`:

```typescript
import { getMasterKey } from './masterKey';
```

- [ ] **Step 2: Replace secret loading on line 60**

Replace:
```typescript
const settingsStore = new SettingsStore(settingsPath, process.env.DIGIKALA_SETTINGS_SECRET || '');
```

With:
```typescript
const masterKey = getMasterKey(dbDir);
const settingsStore = new SettingsStore(settingsPath, masterKey);
```

- [ ] **Step 3: Run the backend and test settings save**

Run: `pnpm nx serve backend` or equivalent
Navigate to http://localhost:3000/settings/ and try saving cookies
Expected: Settings save successfully without DIGIKALA_SETTINGS_SECRET env var

- [ ] **Step 4: Verify .master-key was created**

Run: `cat data/.master-key`
Expected: 64 character hex string (32 bytes)

- [ ] **Step 5: Commit**

```bash
git add apps/backend/src/index.ts
git commit -m "feat(backend): auto-generate master key instead of requiring env var"
```

---

## Task 3: Update .gitignore for clarity

**Files:**
- Modify: `.gitignore`
- Test: verify git status ignores .master-key

- [ ] **Step 1: Add explicit .master-key entry**

Add to `.gitignore`:
```
# Master encryption key (auto-generated)
data/.master-key
```

Note: `**/**/data` already ignores this, but explicit entry clarifies intent.

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "docs: add explicit .master-key to gitignore for clarity"
```

---

## Verification

After implementation:
1. Delete `data/.master-key` if it exists
2. Start backend fresh
3. Verify `.master-key` is created in data directory
4. Navigate to /settings/ and save cookies
5. Verify cookies persist correctly after restart