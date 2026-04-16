# Theme, Persian UI, and RTL Design

## Problem
The frontend is currently dark-only, English-only, and LTR. We need:

1. User-selectable theme (`system`, `light`, `dark`) with safe fallback to light.
2. Full Persian UI text with RTL layout (no i18n framework for now).
3. Standardized backend error payloads for future localization (`code` + English `message`).
4. Verification with existing tests plus Playwright MCP visual checks.

## Scope
- In scope: frontend UI text/layout, theme state management, backend/API error envelope shape where needed by frontend flows.
- Out of scope: full multi-language infrastructure, non-UI domain logic changes.

## Approved Decisions
- Theme control lives in sidebar and is always visible.
- UI text is Persian; engineering discussion remains English.
- Layout is fully RTL (including sidebar on the right).
- Backend returns stable `code` and standard English `message`.
- Frontend shows Persian messages via dictionary keyed by `code`, with fallback to backend English `message`.

## Design

### 1) Theming Architecture
- Add a client-side `ThemeProvider` in frontend with:
  - `themePreference`: `system | light | dark` (stored in `localStorage`).
  - `resolvedTheme`: `light | dark` (computed from preference + system media query).
- On startup:
  - Read stored preference.
  - If missing/invalid, default to `system`.
  - If system resolution fails/unavailable, resolve to `light`.
- Apply resolved theme using `document.documentElement.dataset.theme = "light" | "dark"`.
- Add a sidebar theme control (`select`/segmented control) for `System`, `Light`, `Dark`.

### 2) CSS Token Strategy
- Keep CSS variables as source of truth in `globals.css`.
- Define light palette under `:root` and dark palette under `[data-theme="dark"]`.
- Ensure existing utility classes using variables keep working without per-component rewrites.

### 3) Persian + RTL
- Set root document attributes: `lang="fa"` and `dir="rtl"` in root layout.
- Translate all visible frontend strings to Persian:
  - Navigation/sidebar labels
  - Page headers/descriptions
  - Form labels/placeholders/buttons
  - Table headers/status labels
  - Empty states, local fallback errors, and helper text
- Keep technical identifiers (e.g., `productId`, JSON keys) unchanged in code samples/inputs.
- Update key layout alignments where needed for natural RTL reading order.

### 4) Error Contract and Localization
- Backend API responses used by frontend return error shape:
  - `code`: stable machine-readable code (e.g., `SETTINGS_LOAD_FAILED`)
  - `message`: standard English message
- Frontend error helper:
  - Map known `code` values to Persian UI messages.
  - Fallback order:
    1. Persian dictionary by `code`
    2. Backend English `message`
    3. Existing generic Persian fallback
- This provides immediate Persian UX and a clean path to additional languages later.

### 5) Files/Surfaces to Update
- Frontend:
  - `apps/frontend/src/app/layout.tsx`
  - `apps/frontend/src/app/globals.css`
  - `apps/frontend/src/components/Sidebar.tsx`
  - `apps/frontend/src/app/page.tsx`
  - `apps/frontend/src/app/settings/page.tsx`
  - `apps/frontend/src/app/uploader/page.tsx`
  - `apps/frontend/src/app/variants/page.tsx`
  - `apps/frontend/src/app/console/page.tsx`
  - `apps/frontend/src/lib/api.ts` (error envelope typing + message resolution helper)
- Backend:
  - API handlers that currently return string-only errors (align to `{ code, message }`)
  - Validation/error paths that surface to frontend

### 6) Verification Strategy
- Run existing repository tests to prevent regressions.
- Use Playwright MCP manual visual verification to capture screenshots in:
  - RTL + Persian
  - Light theme
  - Dark theme
  - System mode behavior (including fallback expectation)
- Cover main pages: dashboard, settings, uploader, variants, console, and sidebar theme control state.

## Risks and Mitigations
- **Hydration/theme flicker:** initialize theme as early as possible and set data attribute before first paint where feasible.
- **Partial translation drift:** touch all visible frontend pages in one pass and verify each route visually.
- **Inconsistent backend errors:** normalize error response helper so all endpoints return stable `code` + `message`.
