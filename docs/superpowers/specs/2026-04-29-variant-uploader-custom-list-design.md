# Spec: Custom List via Multiple Fixture Files for Variant Uploader

## Summary
Allow users of the variant-creator service to define multiple fixture (product list) files and select which one to use at runtime. This replaces the current single-input model with a multi-file, selectable workflow.

## Goals
- Support multiple product fixture files (JSON or CSV) in the `variant-creator` service.
- Allow runtime selection of which fixture file to process.
- Allow dynamic creation, editing, and deletion of fixture files through the UI.
- Allow uploading a new CSV file to be used as a fixture (parsed into the expected product list format).
- Maintain backward compatibility with existing single-file CLI and config-based flows.
- Expose the file management UI in the Next.js frontend (`/variants`) and Electron desktop app.

## Non-Goals
- Real-time file watching or auto-reload.

## Current State
- `libs/services/variant-creator/src/Service.ts` accepts `products: any[]` directly.
- CLI and desktop frontend currently pass a single JSON array of products.
- Config is loaded from YAML (`config.live-test.yaml`, `config.example.yaml`).

## Architecture

### 1. File Storage Convention
Establish a convention in `variant-creator`:
- `fixtures/` directory contains all product list files.
- Files follow the naming pattern `{name}.products.json` or `{name}.json`.
- Existing `products.sample.json` and `products.live-test.json` remain.

### 2. Service API Changes (`libs/services/variant-creator/src/Service.ts`)
No direct changes to `runCreation()`. It still accepts `products: any[]`.
Instead, add a thin loader utility:

```ts
// src/fixtureLoader.ts
export function listFixtures(fixturesDir: string): string[];
export function loadFixture(fixturesDir: string, name: string): any[];
```

- `listFixtures`: scans `fixturesDir`, returns filenames without extension (e.g., `["sample", "live-test", "batch-a"]`).
- `loadFixture`: reads `{name}.products.json` or `{name}.json`, validates it is a non-empty array, returns it.

### 3. Config Schema Extension
Add optional top-level field to the YAML config:

```yaml
fixture: "live-test"   # filename without extension
```

If `fixture` is present and `products` input is omitted, the service auto-loads `fixtures/{fixture}.products.json`.

### 4. Backend (`apps/backend`)
Add endpoints under a new `/api/variants` router:

- `GET /api/variants/fixtures` → returns `{ fixtures: ["sample", "live-test", ...] }`
- `POST /api/variants/run` → body `{ fixture: string, config: object, dryRun?: boolean }`. Backend loads the fixture, instantiates `VariantCreatorService`, and runs it.
- `POST /api/variants/fixtures` → body `{ name: string, content: any[] }` (or `csv: File` in multipart). Creates a new fixture file `fixtures/{name}.json` with the given content (parsed array). Returns success.
- `PUT /api/variants/fixtures/:name` → similar to POST, updates existing fixture.
- `DELETE /api/variants/fixtures/:name` → deletes the fixture file.
- `POST /api/variants/fixtures/:name/upload-csv` → multipart upload; parses CSV (expects columns `productId`, `productTitle`) and writes JSON fixture.

All endpoints validate that the fixture name is safe (no path traversal).

### 5. Frontend (`apps/frontend/src/app/variants/page.tsx`)
- Fetch `/api/variants/fixtures` on mount.
- Display a dropdown (`<select>`) populated with fixture names.
- Allow uploading a config YAML (or selecting a preset).
- **Fixture Management UI**:
  - "New Fixture" button opens a modal to create a new fixture file.
  - Modal allows either:
    - Pasting JSON array directly
    - Uploading a CSV file (parsed into product list format: each row becomes `{ productId: number, productTitle: string }`)
    - Editing an existing fixture's content (JSON array)
  - "Delete" button next to each fixture (with confirmation).
- On "Run", POST `/api/variants/run` with the selected fixture and config.
- Show progress and results (reuse existing progress UI if available).

### 6. Desktop Integration (`apps/desktop`)
- The desktop app serves the same Next.js frontend in production, so UI changes automatically apply.
- In dev, ensure the IPC contract exposes the new backend endpoints if the desktop uses direct service calls.

### 7. CLI (`libs/services/variant-creator`)
- Add CLI flag `--fixture <name>` that auto-loads from `fixtures/`.
- If both `--fixture` and `--products <path>` are provided, `--products` wins (explicit override).
- If neither is provided, show an error listing available fixtures.

## Data Flow

```
User selects "batch-a" from dropdown in /variants
  → GET /api/variants/fixtures (populates dropdown)
  → POST /api/variants/run { fixture: "batch-a", config: {...} }
    → backend loads fixtures/batch-a.products.json
      → VariantCreatorService.runCreation(products, config, dryRun)
        → returns results
          → frontend displays status table
```

## Error Handling
- If selected fixture file is missing: return `400` with message `"Fixture 'batch-a' not found in fixtures/"`.
- If fixture file is empty or not an array: return `400` with validation message.
- If `config` is missing or invalid: return `400` with `requestValidation.ts` errors.

## UI/UX Details
- Dropdown shows human-readable names: transform `products.sample.json` → `"Sample"`, `products.live-test.json` → `"Live Test"`.
- Add a "Refresh" button next to the dropdown to re-scan the fixtures directory.
- Display a badge showing the number of products in the selected fixture (count array length).

## Files to Modify / Create
- `libs/services/variant-creator/src/fixtureLoader.ts` — new
- `libs/services/variant-creator/src/index.ts` — export loader, update CLI entry
- `libs/services/variant-creator/src/Service.ts` — minor: no direct change, but verify it accepts loaded arrays cleanly
- `libs/services/variant-creator/config.example.yaml` — add `fixture` example
- `libs/services/variant-creator/package.json` — add `glob` or use Node.js built-in `fs.readdirSync`
- `apps/backend/src/index.ts` — add `/api/variants` router
- `apps/backend/src/requestValidation.ts` — add validation schemas for variant run
- `apps/frontend/src/app/variants/page.tsx` — add fixture dropdown and run button
- `apps/frontend/src/lib/api.ts` — add `listFixtures()` and `runVariantCreation()` helpers
