# Custom List via Multiple Fixture Files Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Allow users to define, upload (JSON or CSV), edit, and select multiple fixture files for the variant-creator service via backend endpoints and a frontend UI.

**Architecture:** A new `fixtureLoader.ts` utility handles filesystem reads/writes in the `fixtures/` directory. Backend exposes REST endpoints to manage these files and trigger runs. Frontend provides a dropdown to select fixtures and a modal to create/upload new ones.

**Tech Stack:** Node.js `fs`, `csv-parse` (or native string splitting), Express routes, React UI with modals.

---

### Task 1: Fixture Loader Utility

**Files:**
- Create: `libs/services/variant-creator/src/fixtureLoader.ts`
- Modify: `libs/services/variant-creator/src/index.ts`
- Modify: `libs/services/variant-creator/src/Service.ts`

- [ ] **Step 1: Write `fixtureLoader.ts`**
```typescript
// libs/services/variant-creator/src/fixtureLoader.ts
import fs from 'fs';
import path from 'path';

export function listFixtures(fixturesDir: string): string[] {
  if (!fs.existsSync(fixturesDir)) return [];
  return fs.readdirSync(fixturesDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace(/\.json$/, '').replace(/\.products$/, ''));
}

export function loadFixture(fixturesDir: string, name: string): any[] {
  const p1 = path.join(fixturesDir, `${name}.products.json`);
  const p2 = path.join(fixturesDir, `${name}.json`);
  
  if (fs.existsSync(p1)) return JSON.parse(fs.readFileSync(p1, 'utf-8'));
  if (fs.existsSync(p2)) return JSON.parse(fs.readFileSync(p2, 'utf-8'));
  throw new Error(`Fixture ${name} not found`);
}

export function saveFixture(fixturesDir: string, name: string, content: any[]) {
  if (!fs.existsSync(fixturesDir)) fs.mkdirSync(fixturesDir, { recursive: true });
  fs.writeFileSync(path.join(fixturesDir, `${name}.json`), JSON.stringify(content, null, 2));
}

export function deleteFixture(fixturesDir: string, name: string) {
  const p1 = path.join(fixturesDir, `${name}.products.json`);
  const p2 = path.join(fixturesDir, `${name}.json`);
  if (fs.existsSync(p1)) fs.unlinkSync(p1);
  if (fs.existsSync(p2)) fs.unlinkSync(p2);
}

export function parseCSVToFixture(csvData: string): any[] {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const productIdIdx = headers.indexOf('productId');
  const productTitleIdx = headers.indexOf('productTitle');
  
  if (productIdIdx === -1 || productTitleIdx === -1) {
    throw new Error('CSV must contain productId and productTitle columns');
  }

  return lines.slice(1).map(line => {
    const cols = line.split(',');
    return {
      productId: parseInt(cols[productIdIdx].trim(), 10),
      productTitle: cols[productTitleIdx].trim()
    };
  }).filter(item => !isNaN(item.productId));
}
```

- [ ] **Step 2: Update CLI (`src/index.ts`)**
```typescript
// Add to libs/services/variant-creator/src/index.ts
import { listFixtures, loadFixture } from './fixtureLoader';
import path from 'path';

// Update CLI args parser to check for --fixture <name>
const fixtureArg = process.argv.indexOf('--fixture');
let products: any[];

if (fixtureArg !== -1 && process.argv[fixtureArg + 1]) {
  const name = process.argv[fixtureArg + 1];
  products = loadFixture(path.join(process.cwd(), 'fixtures'), name);
} else {
  // ... existing config.products logic ...
}
```

- [ ] **Step 3: Run typescript check**
```bash
pnpm --filter variant-creator tsc --noEmit
```
Expected: PASS

- [ ] **Step 4: Commit**
```bash
git add libs/services/variant-creator/src/fixtureLoader.ts libs/services/variant-creator/src/index.ts
git commit -m "feat(variant-creator): add multi-file fixture loader and CSV parser"
```

### Task 2: Backend API Routes

**Files:**
- Modify: `apps/backend/src/index.ts`
- Modify: `apps/backend/src/requestValidation.ts`

- [ ] **Step 1: Add `/api/variants` router**
```typescript
// Add to apps/backend/src/index.ts
import express from 'express';
import { listFixtures, loadFixture, saveFixture, deleteFixture, parseCSVToFixture } from '@digikala/variant-creator/src/fixtureLoader';
import path from 'path';

const variantRouter = express.Router();
const fixturesDir = path.join(process.cwd(), '../libs/services/variant-creator/fixtures');

variantRouter.get('/fixtures', (req, res) => {
  res.json({ fixtures: listFixtures(fixturesDir) });
});

variantRouter.post('/fixtures', (req, res) => {
  const { name, content } = req.body;
  saveFixture(fixturesDir, name, content);
  res.json({ success: true });
});

variantRouter.delete('/fixtures/:name', (req, res) => {
  deleteFixture(fixturesDir, req.params.name);
  res.json({ success: true });
});

variantRouter.post('/fixtures/:name/upload-csv', express.text({ type: 'text/csv' }), (req, res) => {
  const content = parseCSVToFixture(req.body);
  saveFixture(fixturesDir, req.params.name, content);
  res.json({ success: true, count: content.length });
});

variantRouter.post('/run', async (req, res) => {
  const { fixture, config, dryRun } = req.body;
  const products = loadFixture(fixturesDir, fixture);
  // ... instantiate VariantCreatorService and runCreation(products, config, dryRun) ...
  res.json({ success: true, count: products.length }); // Simplified for plan
});

app.use('/api/variants', variantRouter);
```

- [ ] **Step 2: Build backend**
```bash
pnpm --filter backend build
```
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add apps/backend/src/index.ts apps/backend/src/requestValidation.ts
git commit -m "feat(backend): add CRUD endpoints for variant fixtures"
```

### Task 3: Frontend UI

**Files:**
- Modify: `apps/frontend/src/lib/api.ts`
- Modify: `apps/frontend/src/app/variants/page.tsx`

- [ ] **Step 1: Update `api.ts`**
```typescript
// Add to apps/frontend/src/lib/api.ts
export async function fetchFixtures() {
  const res = await fetch('/api/variants/fixtures');
  return res.json();
}
export async function runVariantFixture(fixture: string, config: any) {
  const res = await fetch('/api/variants/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fixture, config, dryRun: false })
  });
  return res.json();
}
export async function uploadCSVFixture(name: string, csvText: string) {
  const res = await fetch(`/api/variants/fixtures/${name}/upload-csv`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/csv' },
    body: csvText
  });
  return res.json();
}
```

- [ ] **Step 2: Update `page.tsx`**
```tsx
// Edit apps/frontend/src/app/variants/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { fetchFixtures, runVariantFixture, uploadCSVFixture } from '@/lib/api';

export default function VariantsPage() {
  const [fixtures, setFixtures] = useState<string[]>([]);
  const [selected, setSelected] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [newName, setNewName] = useState('');

  const load = () => fetchFixtures().then(d => setFixtures(d.fixtures));
  useEffect(() => { load(); }, []);

  const handleUpload = async () => {
    if (!file || !newName) return;
    const text = await file.text();
    await uploadCSVFixture(newName, text);
    setNewName('');
    setFile(null);
    load();
  };

  const handleRun = async () => {
    if (!selected) return;
    await runVariantFixture(selected, { themeId: 1, sizes: [{key: 'M', themeValueId: 10, price: 100}] }); // dummy config
    alert('Run started!');
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Variant Uploader</h1>
      
      <div className="border p-4 rounded space-y-2">
        <h2 className="text-lg font-semibold">1. Select Fixture</h2>
        <div className="flex space-x-2">
          <select className="border p-2 rounded" value={selected} onChange={e => setSelected(e.target.value)}>
            <option value="">-- Select --</option>
            {fixtures.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={load}>Refresh</button>
        </div>
      </div>

      <div className="border p-4 rounded space-y-2">
        <h2 className="text-lg font-semibold">Upload New CSV Fixture</h2>
        <input type="text" placeholder="Fixture Name" value={newName} onChange={e => setNewName(e.target.value)} className="border p-2 rounded mr-2" />
        <input type="file" accept=".csv" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpload}>Upload</button>
      </div>

      <button className="bg-indigo-600 text-white px-6 py-2 rounded font-bold" onClick={handleRun} disabled={!selected}>
        RUN VARIANT CREATOR
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Run Next build**
```bash
pnpm --filter frontend build
```
Expected: PASS

- [ ] **Step 4: Commit**
```bash
git add apps/frontend/src/lib/api.ts apps/frontend/src/app/variants/page.tsx
git commit -m "feat(frontend): add fixture selection and CSV upload UI"
```
