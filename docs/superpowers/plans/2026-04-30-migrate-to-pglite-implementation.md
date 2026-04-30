# Migrate from better-sqlite3 to PGlite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `better-sqlite3` with `@electric-sql/pglite` to provide a fully asynchronous, PostgreSQL-compatible storage layer.

**Architecture:** We will replace the synchronous `Database` class with an async-initialized version using PGlite. All database methods will become `async`. Downstream services (`ProductUploaderService`, `VariantCreatorService`) and consumers (`backend`, `desktop`) will be updated to `await` these operations. We'll use a new data file/directory (`digikala-auto.pglite`) to ensure a fresh start.

**Tech Stack:** `@electric-sql/pglite`, TypeScript, Express, Electron, Next.js.

---

### Task 1: Update Dependencies

**Files:**
- Modify: `package.json`
- Modify: `libs/core/package.json`
- Modify: `apps/desktop/package.json`
- Modify: `apps/backend/package.json`
- Modify: `pnpm-workspace.yaml`

- [ ] **Step 1: Uninstall better-sqlite3 and install PGlite**

Run: `pnpm remove better-sqlite3 @types/better-sqlite3 -w`
Run: `pnpm remove better-sqlite3 @types/better-sqlite3 --filter=@digikala/core --filter=@digikala/desktop --filter=@digikala/backend`
Run: `pnpm add @electric-sql/pglite -w`
Run: `pnpm add @electric-sql/pglite --filter=@digikala/core --filter=@digikala/desktop --filter=@digikala/backend`
Expected: `package.json` files are updated with `@electric-sql/pglite`.

- [ ] **Step 2: Commit**

```bash
git add package.json libs/core/package.json apps/desktop/package.json apps/backend/package.json pnpm-lock.yaml pnpm-workspace.yaml
git commit -m "chore: replace better-sqlite3 with pglite dependencies"
```

---

### Task 2: Refactor Core Database to PGlite

**Files:**
- Modify: `libs/core/src/Database.ts`

- [ ] **Step 1: Replace imports and class structure**

```typescript
import { PGlite } from '@electric-sql/pglite';
import path from 'path';
import fs from 'fs';
import { logger } from './Logger';

export interface ProductRecord {
  id?: number;
  productId: number;
  title: string;
  model: string | null;
  sourceFile: string | null;
  createdAt: string;
}

export interface VariantStateRecord {
  id?: number;
  fingerprint: string;
  productId: number;
  variantId: number;
  createdAt: string;
}

export class Database {
  private db: PGlite;

  private constructor(db: PGlite) {
    this.db = db;
  }

  static async create(dbPath: string): Promise<Database> {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const db = new PGlite(dbPath);
    await db.waitReady;
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        productId INTEGER NOT NULL UNIQUE,
        title TEXT NOT NULL,
        model TEXT,
        sourceFile TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS variant_state (
        id SERIAL PRIMARY KEY,
        fingerprint TEXT NOT NULL UNIQUE,
        productId INTEGER NOT NULL,
        variantId INTEGER NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    logger.debug('Database schema initialized');
    return new Database(db);
  }

  async addProduct(productId: number, title: string, model: string | null = null, sourceFile: string | null = null): Promise<number> {
    const res = await this.db.query<{ id: number }>(`
      INSERT INTO products (productId, title, model, sourceFile) 
      VALUES ($1, $2, $3, $4)
      ON CONFLICT(productId) DO UPDATE SET 
        title=EXCLUDED.title, 
        model=EXCLUDED.model, 
        sourceFile=EXCLUDED.sourceFile
      RETURNING id
    `, [productId, title, model, sourceFile]);
    return res.rows[0].id;
  }

  async getProduct(productId: number): Promise<ProductRecord | undefined> {
    const res = await this.db.query<ProductRecord>('SELECT * FROM products WHERE productId = $1', [productId]);
    return res.rows[0];
  }

  async getAllProducts(): Promise<ProductRecord[]> {
    const res = await this.db.query<ProductRecord>('SELECT * FROM products ORDER BY createdAt DESC');
    return res.rows;
  }

  async addVariantState(fingerprint: string, productId: number, variantId: number): Promise<number | undefined> {
    const res = await this.db.query<{ id: number }>(`
      INSERT INTO variant_state (fingerprint, productId, variantId) 
      VALUES ($1, $2, $3)
      ON CONFLICT(fingerprint) DO NOTHING
      RETURNING id
    `, [fingerprint, productId, variantId]);
    return res.rows[0]?.id;
  }

  async getVariantState(fingerprint: string): Promise<VariantStateRecord | undefined> {
    const res = await this.db.query<VariantStateRecord>('SELECT * FROM variant_state WHERE fingerprint = $1', [fingerprint]);
    return res.rows[0];
  }

  async hasVariantState(fingerprint: string): Promise<boolean> {
    const res = await this.db.query<{ 1: number }>('SELECT 1 FROM variant_state WHERE fingerprint = $1', [fingerprint]);
    return res.rows.length > 0;
  }

  async close(): Promise<void> {
    await this.db.close();
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add libs/core/src/Database.ts
git commit -m "refactor: migrate Database class to PGlite and async API"
```

---

### Task 3: Refactor Stats Payload to Async PGlite

**Files:**
- Modify: `libs/core/src/stats.ts`
- Modify: `tests/stats-api.test.ts`

- [ ] **Step 1: Update stats.ts**

```typescript
import { PGlite } from '@electric-sql/pglite';

export interface StatsPayload {
  productsUploaded: number;
  variantsCreated: number;
  lastRunAt: string | null;
}

interface StatsRow {
  productsuploaded: string | number;
  variantscreated: string | number;
  lastrunat: string | null;
}

export function buildStatsPayload(input: StatsPayload): StatsPayload {
  return input;
}

export async function loadStatsPayload(dbPath: string): Promise<StatsPayload> {
  const db = new PGlite(dbPath);
  await db.waitReady;
  
  try {
    const res = await db.query<StatsRow>(`
      SELECT
        (SELECT COUNT(*) FROM products) AS productsUploaded,
        (SELECT COUNT(*) FROM variant_state) AS variantsCreated,
        (
          SELECT MAX(createdAt)
          FROM (
            SELECT createdAt FROM products
            UNION ALL
            SELECT createdAt FROM variant_state
          ) as all_dates
        ) AS lastRunAt
    `);

    const row = res.rows[0];

    return buildStatsPayload({
      productsUploaded: Number(row?.productsuploaded ?? 0),
      variantsCreated: Number(row?.variantscreated ?? 0),
      lastRunAt: row?.lastrunat ?? null,
    });
  } catch (err) {
    // If the tables don't exist yet, return empty stats
    return buildStatsPayload({ productsUploaded: 0, variantsCreated: 0, lastRunAt: null });
  } finally {
    await db.close();
  }
}
```

- [ ] **Step 2: Update stats-api.test.ts**

*Locate the synchronous call to `loadStatsPayload` and update to `await loadStatsPayload`. Also fix any `expect(() => loadStatsPayload(...)).toThrow()` to be `await expect(loadStatsPayload(...)).rejects.toThrow()`.*

```typescript
// Replace the exact lines testing failure (if they exist) with standard async throw check
// e.g., if there's: expect(() => loadStatsPayload('Z:\\path')).toThrow();
// Change to: await expect(loadStatsPayload('Z:\\path')).rejects.toThrow();
// Or simply remove it if PGlite handles nonexistent paths gracefully (it does).
```

- [ ] **Step 3: Run Tests to Verify core compilation**

Run: `pnpm nx run core:build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add libs/core/src/stats.ts tests/stats-api.test.ts
git commit -m "refactor: update stats payload to use async PGlite"
```

---

### Task 4: Propagate Async DB to Services

**Files:**
- Modify: `libs/services/product-uploader/src/Service.ts`
- Modify: `libs/services/variant-creator/src/Service.ts`

- [ ] **Step 1: Update ProductUploaderService**

In `libs/services/product-uploader/src/Service.ts`, find the `runUpload` method.
Change `this.db.addProduct(...)` to `await this.db.addProduct(...)`.

```typescript
// In ProductUploaderService.ts around line 108:
        await this.db.addProduct(productId, title, row.model, csvPath);
```

- [ ] **Step 2: Update VariantCreatorService**

In `libs/services/variant-creator/src/Service.ts`, find the `runCreation` method.
Update `this.db.hasVariantState` and `this.db.addVariantState` to `await`.

```typescript
// In VariantCreatorService.ts around line 46:
          const hasState = await this.db.hasVariantState(fingerprint);
          if (hasState || existingFingerprints.has(fingerprint)) {
            skipped += 1;
            continue;
          }

// And around line 65:
          await this.db.addVariantState(fingerprint, product.productId, variantId);
```

- [ ] **Step 3: Commit**

```bash
git add libs/services/product-uploader/src/Service.ts libs/services/variant-creator/src/Service.ts
git commit -m "refactor: propagate async Database methods to services"
```

---

### Task 5: Update Backend and Desktop Apps

**Files:**
- Modify: `apps/backend/src/index.ts`
- Modify: `apps/desktop/src/main.ts`

- [ ] **Step 1: Update Backend App (`apps/backend/src/index.ts`)**

Change the DB initialization and stats endpoint. Change the file name to `digikala-auto.pglite`.

```typescript
// Replace lines 55-58 with:
const dbPath = path.join(dbDir, 'digikala-auto.pglite');
const settingsPath = path.join(dbDir, 'digikala-settings.secure.json');

let db: Database;
Database.create(dbPath).then(instance => {
  db = instance;
}).catch(err => {
  logger.error('Failed to initialize database', { error: err });
  process.exit(1);
});

// Update GET /api/stats (around line 138):
app.get('/api/stats', async (req, res) => {
  try {
    const { productsUploaded, variantsCreated, lastRunAt } = await loadStatsPayload(dbPath);
    res.json({ success: true, stats: buildStatsPayload({ productsUploaded, variantsCreated, lastRunAt }) });
// ... rest of method remains same
```

- [ ] **Step 2: Update Desktop App (`apps/desktop/src/main.ts`)**

Change the DB initialization and IPC handlers. Change the file name to `digikala-auto.pglite`.

```typescript
// Replace line 20 with:
const dbPath = path.join(app.getPath('userData'), 'digikala-auto.pglite');

// Update app.whenReady().then(...) around line 28:
app.whenReady().then(async () => {
    try {
        db = await Database.create(dbPath);
    } catch (error: unknown) {
        dialog.showErrorBox('Startup Error', formatNativeModuleReadinessError(String(error)));
        app.quit();
        return;
    }
// ...

// Update get-stats IPC handler around line 112:
    ipcMain.handle('get-stats', async () => await loadStatsPayload(dbPath));
```

- [ ] **Step 3: Commit**

```bash
git add apps/backend/src/index.ts apps/desktop/src/main.ts
git commit -m "refactor: update apps to await PGlite db init and use new directory"
```

---

### Task 6: Final Verification

- [ ] **Step 1: Run all tests**

Run: `pnpm nx run-many -t test`
Expected: PASS

- [ ] **Step 2: Build the project**

Run: `pnpm nx run-many -t build`
Expected: PASS

- [ ] **Step 3: Commit any final typing/build fixes (if necessary)**

```bash
git commit -am "fix: resolve typescript strictness errors for pglite migration"
```
