# Digitu Branding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralize branding assets and configuration for the Digikala Automation Suite ("Digitu").

**Architecture:** Create a shared `@digikala/branding` library containing naming constants, source assets, and a generation script to distribute icons and manifests to the frontend and desktop applications.

**Tech Stack:** Nx, TypeScript, Node.js (fs/path).

---

### Task 1: Scaffold @digikala/branding Library

**Files:**
- Create: `libs/branding/project.json`
- Create: `libs/branding/package.json`
- Create: `libs/branding/src/index.ts`
- Create: `libs/branding/tsconfig.json`

- [ ] **Step 1: Generate the library using Nx**

Run: `pnpm nx g @nx/js:library branding --directory=libs/branding --projectNameAndRootFormat=as-provided --importPath=@digikala/branding`

- [ ] **Step 2: Define naming constants in `libs/branding/src/index.ts`**

```typescript
export const BRANDING = {
  displayName: 'Digikala Automation Suite',
  shortName: 'Digitu',
  description: 'Digikala product and variant desktop automation suite',
};
```

- [ ] **Step 3: Commit**

```bash
git add libs/branding
git commit -m "feat(branding): scaffold branding library and naming constants"
```

---

### Task 2: Migrate Source Assets

**Files:**
- Create: `libs/branding/assets/dark.png`
- Create: `libs/branding/assets/dark.svg`
- Create: `libs/branding/assets/light.png`
- Create: `libs/branding/assets/light.svg`

- [ ] **Step 1: Create assets directory and move files**

Run: `mkdir -p libs/branding/assets && mv temp-logo/* libs/branding/assets/`

- [ ] **Step 2: Commit**

```bash
git add libs/branding/assets
git commit -m "feat(branding): migrate source logos to branding library"
```

---

### Task 3: Implement Asset Generation Script

**Files:**
- Create: `libs/branding/scripts/generate-assets.ts`

- [ ] **Step 1: Write the generation script**
The script will copy assets and generate `manifest.json`. (Note: Since `sharp` isn't available, we'll start with copying the main assets and providing instructions for manual icon conversion if needed, or use a simple copy for now).

```typescript
import * as fs from 'fs';
import * as path from 'path';

const BRANDING = {
  displayName: 'Digikala Automation Suite',
  shortName: 'Digitu',
  description: 'Digikala product and variant desktop automation suite',
};

const ROOT = path.resolve(__dirname, '../../..');
const SOURCE_DIR = path.resolve(__dirname, '../assets');
const FRONTEND_PUBLIC = path.resolve(ROOT, 'apps/frontend/public');
const DESKTOP_ASSETS = path.resolve(ROOT, 'apps/desktop/assets');

function generate() {
  if (!fs.existsSync(FRONTEND_PUBLIC)) fs.mkdirSync(FRONTEND_PUBLIC, { recursive: true });
  if (!fs.existsSync(DESKTOP_ASSETS)) fs.mkdirSync(DESKTOP_ASSETS, { recursive: true });

  // 1. Copy SVG logos
  fs.copyFileSync(path.join(SOURCE_DIR, 'dark.svg'), path.join(FRONTEND_PUBLIC, 'logo-dark.svg'));
  fs.copyFileSync(path.join(SOURCE_DIR, 'light.svg'), path.join(FRONTEND_PUBLIC, 'logo-light.svg'));
  fs.copyFileSync(path.join(SOURCE_DIR, 'dark.svg'), path.join(DESKTOP_ASSETS, 'icon.svg'));

  // 2. Generate Web Manifest
  const manifest = {
    name: BRANDING.displayName,
    short_name: BRANDING.shortName,
    description: BRANDING.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ef4056',
    icons: [
      {
        src: '/logo-dark.svg',
        sizes: 'any',
        type: 'image/svg+xml'
      }
    ]
  };

  fs.writeFileSync(
    path.join(FRONTEND_PUBLIC, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Branding assets generated successfully.');
}

generate();
```

- [ ] **Step 2: Add generation target to `libs/branding/project.json`**

```json
"targets": {
  "generate": {
    "executor": "nx:run-commands",
    "options": {
      "command": "ts-node libs/branding/scripts/generate-assets.ts"
    }
  }
}
```

- [ ] **Step 3: Run generation**

Run: `pnpm nx run branding:generate`

- [ ] **Step 4: Commit**

```bash
git add libs/branding/scripts libs/branding/project.json
git commit -m "feat(branding): add asset generation script"
```

---

### Task 4: Update Frontend Application

**Files:**
- Modify: `apps/frontend/app/layout.tsx` (or similar)
- Modify: `apps/frontend/package.json`

- [ ] **Step 1: Link branding library to frontend**

Run: `pnpm add @digikala/branding --workspace`

- [ ] **Step 2: Update Layout metadata**

```typescript
import { BRANDING } from '@digikala/branding';

export const metadata = {
  title: BRANDING.displayName,
  description: BRANDING.description,
  manifest: '/manifest.json',
};
```

- [ ] **Step 3: Commit**

```bash
git add apps/frontend
git commit -m "feat(frontend): integrate branding constants and manifest"
```

---

### Task 5: Update Desktop Application

**Files:**
- Modify: `apps/desktop/package.json`

- [ ] **Step 1: Update product names in `apps/desktop/package.json`**

```json
"productName": "Digikala Automation Suite",
"build": {
  "appId": "com.digitu.auto",
  "directories": {
    "output": "release"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/desktop/package.json
git commit -m "feat(desktop): update product branding in electron config"
```
