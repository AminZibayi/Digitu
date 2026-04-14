# Digikala Automation Desktop Cleanup & Architecture Stabilization Spec

## 1. Problem Statement

The repository has already moved to an Electron + Next.js + workspace architecture, but it still behaves like a partially transitioned system:

- Desktop mode and web mode expectations are mixed.
- Frontend static export works for Electron packaging but degrades in browser-only fallback scenarios without backend.
- Native dependency/runtime compatibility (`better-sqlite3`) is fragile outside the Electron-rebuilt environment.
- Dashboard/observability are present but not yet fully connected to operational metrics.

This spec defines a **cleanup and hardening scope** for the existing architecture (not a greenfield rewrite).

## 2. Goals and Non-Goals

### Goals

1. Make desktop runtime the primary, reliable execution mode.
2. Keep strict IPC boundaries (context isolation + typed contracts).
3. Ensure backend/service reliability and predictable failure behavior.
4. Produce a stable packaged app path (`electron-builder`) where native modules and static frontend assets work together.
5. Tighten product UX around operational clarity (status, errors, logs, progress).

### Non-Goals

1. Replacing Electron or Next.js.
2. Reintroducing CLI-first workflows as primary operator UX.
3. Introducing cloud sync/multi-user orchestration in this cycle.
4. Full visual redesign.

## 3. Current-State Summary

## Implemented Baseline (already in code)

- Monorepo with:
  - `packages/core`
  - `packages/services/product-uploader`
  - `packages/services/variant-creator`
  - `apps/desktop`, `apps/frontend`, `apps/backend`
- Electron main process starts service layer through IPC.
- Next frontend has dedicated pages for dashboard, settings, uploader, variant creation, and live console.
- Request validation has been added at backend boundaries.
- Build and test pipelines pass in repository CI-style commands.

## Gaps / Risks

1. Native module compatibility for standalone Node backend runs can fail on host toolchain variance.
2. Browser fallback mode has expected API failures when backend is absent (acceptable for desktop-first, but should be explicitly documented and surfaced).
3. Dashboard cards are partially static placeholders.
4. Packaging warnings indicate production hardening opportunities (asar/security packaging posture, app metadata completeness, icon/signing strategy).

## 4. Candidate Approaches

### Approach A (Recommended): Desktop-Primary Hardening (Incremental)

Keep current architecture and harden it:

- Treat Electron runtime as source of truth.
- Limit browser fallback to development diagnostics only.
- Formalize compatibility constraints and startup checks for native modules.
- Connect dashboard + status indicators to real backend state.

**Pros:** lowest migration risk, fastest to production readiness, preserves existing work.  
**Cons:** web-only mode remains intentionally limited.

### Approach B: Dual-Mode First-Class (Desktop + Web Parity)

Make backend/API fully runnable independently, with web mode treated as a peer target.

**Pros:** broader deployment options.  
**Cons:** higher complexity, duplicated operational paths, larger test matrix.

### Approach C: Electron-Only Runtime Lockdown

Remove backend web serving mode entirely and expose all interactions only via IPC.

**Pros:** strongest mode clarity, smallest runtime surface.  
**Cons:** loses web-based diagnostics and local browser fallback utility.

## Recommendation

Adopt **Approach A** now. It aligns with project intent (desktop-first), reduces risk, and avoids unnecessary architectural churn.

## 5. Target Design

### 5.1 Runtime Topology

1. **Electron Main Process (`apps/desktop`)**
   - Owns lifecycle, IPC handlers, secure settings store, and service orchestration.
2. **Frontend (`apps/frontend`)**
   - Static export loaded by Electron in production package.
   - In development, can run in browser, but desktop behaviors are marked and guarded.
3. **Core + Services (`packages/core`, `packages/services/*`)**
   - Core: API client, logging, settings normalization, DB adapter.
   - Services: uploader and variant creator business workflows.

### 5.2 IPC Contract Boundaries

All renderer interactions go through `window.electronAPI` only.

Required channels:

- settings: `getSettings`, `saveSettings`
- uploader: `runUpload`, `onUploadProgress`, `pickCsvPath`
- variants: `runVariantCreation`, `onVariantProgress`
- logs: `onLogMessage`

Contract requirements:

1. Validate payloads at main-process boundary.
2. Return structured `{ success, error?, results? }` envelopes.
3. Ensure event subscriptions return cleanup/unsubscribe handles.

### 5.3 Data Flow

## Product Upload

1. UI submits CSV path.
2. Main process validates input + settings readiness.
3. `ProductUploaderService` parses rows, calls Digikala API, writes DB records.
4. Progress is emitted over IPC and rendered in row status table.

## Variant Creation

1. UI submits products + config + dry-run.
2. Main process validates payload shape.
3. `VariantCreatorService` performs idempotent variant creation.
4. Results + progress stream back to UI.

## Logging

1. Shared logger emits structured entries.
2. Main process forwards entries to UI.
3. UI console supports filter/search/pause/clear.

### 5.4 Error Handling and Reliability

1. **Fail fast on invalid payloads** at all boundaries.
2. **Actionable errors** in UI banners with consistent wording.
3. **Retry strategy** lives in `DigikalaClient` (network/transient failures).
4. **No silent fallbacks**; all suppressed paths must log explicit diagnostics.
5. **Native dependency readiness check** at app startup with clear remediation message.

### 5.5 Packaging and Distribution

1. Keep `electron-builder` as packaging tool.
2. Bundle:
   - desktop compiled output (`dist`)
   - static frontend output (`frontend/out`)
3. Define production hardening checklist:
   - app metadata completeness (description/author/icon/signing policy)
   - asar strategy and exceptions for native modules
   - deterministic native rebuild for Electron target

## 6. Testing Strategy

### Automated

1. Unit tests for:
   - request/IPC validators
   - settings normalization
   - service parsing/rule logic
2. Build checks:
   - workspace package builds
   - frontend static export
   - desktop compile/package dry build

### End-to-End / Visual

1. Desktop-run E2E as primary acceptance path.
2. Route-level visual snapshots for:
   - dashboard, settings, uploader, variants, console
3. Error-path scenarios:
   - missing settings
   - invalid CSV path
   - invalid variant payload

## 7. Delivery Slices

1. **Slice 1: Runtime hardening**
   - startup checks, native dependency diagnostics, boundary validation completion
2. **Slice 2: UX operational clarity**
   - wire dashboard to real stats, improve state/error surfaces
3. **Slice 3: packaging hardening**
   - metadata, signing posture, asar/native compatibility rules
4. **Slice 4: acceptance**
   - desktop E2E + visual runbook and evidence artifacts

## 8. Acceptance Criteria

1. Desktop app starts and runs uploader/variant workflows end-to-end in packaged mode.
2. IPC boundaries reject malformed inputs and return structured errors.
3. UI surfaces clear operational state and progress for long-running tasks.
4. Build/test/package commands complete without blocking errors.
5. E2E + visual suite evidence exists for all core screens and key failure paths.

