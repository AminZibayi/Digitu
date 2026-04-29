# Auto-publish after Draft Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an `autoPublish` option to the product uploader. After successful draft creation and finalization, automatically call the publish endpoint to make the product live.

**Architecture:** Extend `DigikalaClient` with a `publishProduct` method. Update `ProductUploaderService` and legacy `digikala-uploader.js` to conditionally call this method after finalization. Update CLI, backend API, and frontend UI to expose the toggle.

**Tech Stack:** TypeScript, Node.js, Express, React (Next.js).

---

### Task 1: Extend DigikalaClient

**Files:**
- Modify: `libs/core/src/DigikalaClient.ts`

- [ ] **Step 1: Add `publishProduct` method**
```typescript
// Add to libs/core/src/DigikalaClient.ts
  public async publishProduct(productId: number): Promise<{ isValid: boolean }> {
    const response = await this.requestJson<{ data?: { isValid?: boolean } }>(
      `/product-edit/${productId}/publish`,
      { method: 'POST' }
    );
    return { isValid: !!response.data?.isValid };
  }
```

- [ ] **Step 2: Run build to verify core compiles**
```bash
pnpm --filter @digikala/core build
```
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add libs/core/src/DigikalaClient.ts
git commit -m "feat(core): add publishProduct to DigikalaClient"
```

### Task 2: Update Product Uploader Service (TS)

**Files:**
- Modify: `libs/services/product-uploader/product-uploader/src/Service.ts`

- [ ] **Step 1: Update `runUpload` to accept `autoPublish`**
```typescript
// libs/services/product-uploader/product-uploader/src/Service.ts
// Update method signature:
  public async runUpload(
    csvPath: string,
    onProgress?: (index: number, total: number, productTitle: string, status: string) => void,
    options: { autoPublish?: boolean } = {}
  ) {
    // ... inside loop after finalizeProduct ...
        const productId = await this.finalizeProduct(draftId, encryptedIds);

        if (!productId) {
          throw new Error('Product creation completed but no productId was returned.');
        }

        let status = 'success';
        if (options.autoPublish) {
          try {
            const { isValid } = await this.client.publishProduct(productId);
            if (isValid) {
              status = 'published';
            } else {
              status = 'draft-only (publish invalid)';
              logger.warn(`Publish reported invalid for ${title}`, { productId });
            }
          } catch (e: any) {
            status = 'draft-only (publish failed)';
            logger.error(`Auto-publish failed for ${title}`, { productId, error: e.message });
          }
        }

        this.db.addProduct(productId, title, row.model, csvPath);
        onProgress?.(i, parsedRows.length, title, status);
        results.push({ status, title, productId });
    // ...
```

- [ ] **Step 2: Run build**
```bash
pnpm --filter @digikala/product-uploader build
```
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add libs/services/product-uploader/product-uploader/src/Service.ts
git commit -m "feat(product-uploader): implement auto-publish in Service"
```

### Task 3: Update Legacy Uploader and CLI

**Files:**
- Modify: `libs/services/product-uploader/digikala-uploader.js`
- Modify: `libs/services/product-uploader/cli.js`

- [ ] **Step 1: Update `digikala-uploader.js`**
```javascript
// Add to libs/services/product-uploader/digikala-uploader.js
// Near processProduct function:
async function publishProduct(productId) {
  return await apiCall("POST", `/product-edit/${productId}/publish`);
}

// Inside processProduct after finalizeProduct:
    const productId = await finalizeProduct(draftId, encryptedIds);
    console.log(`✓  →  product_id=${productId}`);

    if (p.autoPublish) {
      process.stdout.write("  [6/6] Publishing  ... ");
      try {
        const publishData = await publishProduct(productId);
        if (publishData?.isValid) {
          console.log("✓ Published!");
        } else {
          console.log("⚠ Invalid for publish");
        }
      } catch (e) {
        console.log(`❌ Publish failed: ${e.message}`);
      }
    }
```

- [ ] **Step 2: Update CLI to accept flag**
```javascript
// Add to libs/services/product-uploader/cli.js
// Update SUPPORTED_FLAGS
const SUPPORTED_FLAGS = new Set([
  // ...
  "--auto-publish",
]);

// Inside parseCSV equivalent or mapping:
// When mapping products for upload:
    const autoPublish = args.includes("--auto-publish");
    productsToUpload = parsedForUpload.map(p => ({ ...p, autoPublish }));
```

- [ ] **Step 3: Commit**
```bash
git add libs/services/product-uploader/digikala-uploader.js libs/services/product-uploader/cli.js
git commit -m "feat(product-uploader): add --auto-publish flag to legacy uploader and CLI"
```

### Task 4: Backend API and Frontend UI

**Files:**
- Modify: `apps/backend/src/index.ts`
- Modify: `apps/frontend/src/app/uploader/page.tsx`
- Modify: `apps/frontend/src/lib/api.ts`

- [ ] **Step 1: Update backend route**
```typescript
// apps/backend/src/index.ts
// Inside upload route handler:
  const { csvPath, autoPublish } = req.body;
  const results = await uploaderService.runUpload(csvPath, undefined, { autoPublish });
  res.json({ results });
```

- [ ] **Step 2: Update Frontend UI**
```tsx
// apps/frontend/src/app/uploader/page.tsx
// Add checkbox state:
const [autoPublish, setAutoPublish] = useState(false);

// Add checkbox to UI:
<label className="flex items-center space-x-2">
  <input type="checkbox" checked={autoPublish} onChange={e => setAutoPublish(e.target.checked)} />
  <span>Auto-publish after successful draft</span>
</label>

// Include in API call:
await runUpload(csvPath, { autoPublish });

// Update results table to show status:
{results.map(r => (
  <tr key={r.productId}>
    <td>{r.title}</td>
    <td className={r.status === 'published' ? 'text-green-500' : 'text-blue-500'}>{r.status}</td>
  </tr>
))}
```

- [ ] **Step 3: Commit**
```bash
git add apps/backend/src/index.ts apps/frontend/src/app/uploader/page.tsx apps/frontend/src/lib/api.ts
git commit -m "feat(ui): add auto-publish checkbox to uploader page"
```
