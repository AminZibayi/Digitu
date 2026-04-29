# Spec: Auto-publish after Draft in Product Uploader

## Summary
Add an `autoPublish` option to the product-uploader service and backend API. After the existing 5-step draft pipeline completes successfully, conditionally call the Digikala publish endpoint (`POST /api/v2/product-edit/{productId}/publish`) to make the product live immediately.

## Goals
- Reduce manual steps for users who want products live immediately after upload.
- Respect Digikala's publish API contract (response shape provided in `api.example.js`).
- Make the feature opt-in via config/flag to preserve existing conservative behavior.
- Expose the option in the frontend `/uploader` page and backend API.

## Non-Goals
- Re-publishing already-live products.
- Batch publish as a separate standalone operation.
- Handling publish scheduling or delayed publish.

## API Reference
From `api.example.js`:

```js
fetch("https://seller.digikala.com/api/v2/product-edit/21602021/publish", {
  method: "POST",
  headers: { /* auth headers */ },
  body: null,
});
// Response: { status: "ok", data: { isValid: true } }
```

Key observations:
- Endpoint: `POST /api/v2/product-edit/{productId}/publish`
- Body: `null` (empty POST)
- Success: `status === "ok"` and `data.isValid === true`

## Architecture

### 1. Core Client Extension (`libs/core/src/DigikalaClient.ts`)
Add a method to the shared client:

```ts
async publishProduct(productId: number): Promise<{ isValid: boolean }>
```

Implementation:
- POST to `/api/v2/product-edit/${productId}/publish` with empty body.
- Parse response. If `status !== "ok"` or `data.isValid !== true`, throw a descriptive error.
- On network failure, throw standard `DigikalaClient` error.

### 2. Product Uploader Service (`libs/services/product-uploader/digikala-uploader.js`)
The uploader currently executes 5 steps:
1. create draft basic info
2. save attributes and dimensions
3. save titles
4. upload images
5. finalize product with image order

After step 5 succeeds:
- If `autoPublish === true`, call `client.publishProduct(productId)`.
- If publish succeeds, log `info` and mark product status as `"published"`.
- If publish fails, log `error` with the failure reason, but do **not** mark the whole batch as failed. The draft is still valid; only the publish step failed.

Add `autoPublish` to the uploader options/config object. Default: `false`.

### 3. CLI (`libs/services/product-uploader/cli.js`)
Add `--auto-publish` flag. Pass it through to the uploader options.

### 4. Backend API (`apps/backend/src/index.ts`)
Extend the existing upload endpoint (or create `/api/uploader/run`) to accept:

```json
{
  "dryRun": false,
  "autoPublish": true,
  "products": [...],
  "config": { ... }
}
```

Validate `autoPublish` is a boolean. Pass it to the service.

### 5. Frontend (`apps/frontend/src/app/uploader/page.tsx`)
- Add a checkbox labeled `"Auto-publish after successful draft"`.
- Include `autoPublish: boolean` in the POST body to `/api/uploader/run`.
- In the results table, display a new status column: `draft` | `published` | `draft + publish failed`.

### 6. Desktop Integration
- Desktop serves the Next.js frontend, so the checkbox appears automatically.
- If desktop has its own direct service invocation path, ensure `autoPublish` is forwarded.

## Data Flow

```
User checks "Auto-publish" in /uploader and clicks Run
  → POST /api/uploader/run { autoPublish: true, ... }
    → backend validates and calls Uploader.run(products, { autoPublish: true })
      → Step 1..5 execute as before
        → Step 5 (finalize) succeeds
          → if autoPublish:
            → client.publishProduct(productId)
              → if success: status = "published"
              → if failure: status = "draft + publish failed", log error
        → Return per-product results
          → frontend renders status table
```

## Error Handling
- **Publish API returns non-ok status**: Treat as a step failure for that specific product only. Log full response body for debugging.
- **Publish API network error**: Same as above—log error, continue batch.
- **Invalid `productId` after finalize**: This should never happen if step 5 succeeded, but guard anyway and log a fatal-style error.
- **User does not have publish permission**: Digikala may return `403`. Log the exact status and body; do not retry.

## Configuration
| Source | Key | Type | Default |
|--------|-----|------|---------|
| Config object | `autoPublish` | `boolean` | `false` |
| CLI flag | `--auto-publish` | flag | `false` |
| API body | `autoPublish` | `boolean` | `false` |

## UI/UX Details
- The checkbox should be **unchecked by default** to avoid accidental live publishes.
- When checked, show a subtle warning text: `"Products will be published immediately after successful draft creation."`
- In the results table, use color coding:
  - `published` → green
  - `draft` → blue
  - `draft + publish failed` → orange (not red, because the draft itself succeeded)

## Files to Modify / Create
- `libs/core/src/DigikalaClient.ts` — add `publishProduct()`
- `libs/services/product-uploader/digikala-uploader.js` — add autoPublish logic after step 5
- `libs/services/product-uploader/cli.js` — add `--auto-publish` flag
- `apps/backend/src/index.ts` — extend upload endpoint with `autoPublish`
- `apps/backend/src/requestValidation.ts` — add `autoPublish: z.boolean().optional()`
- `apps/frontend/src/app/uploader/page.tsx` — add checkbox and status column
- `apps/frontend/src/lib/api.ts` — update upload API call signature
- `libs/services/product-uploader/API-SPEC.md` — document the publish endpoint contract
