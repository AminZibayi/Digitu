# Design Doc: Centralized Branding and Assets for Digitu

**Status:** Approved
**Author:** opencode
**Date:** 2026-04-30

## 1. Objective
Create a centralized branding system for the "Digikala Automation Suite" (Short name: "Digitu") to ensure consistency across the Next.js web application and the Electron desktop application.

## 2. Proposed Changes

### 2.1 Workspace Structure
We will create a new Nx library `@digikala/branding` to house all branding-related data.

- **Library Location:** `libs/branding`
- **Source Assets:** Move `temp-logo/` files to `libs/branding/assets/`.
- **Configuration:** A central JSON/TS file containing:
  - `displayName`: "Digikala Automation Suite"
  - `shortName`: "Digitu"

### 2.2 Asset Generation Script
A utility script in `libs/branding/scripts/generate.ts` will:
1.  **Generate Favicons:** Create `favicon.ico` and PNG icons for `@digikala/frontend`.
2.  **Generate Web Manifest:** Create `manifest.json` for the frontend.
3.  **Generate Desktop Icons:** Create `.ico` and `.png` icons for `@digikala/desktop`.

### 2.3 Integration

#### Web (`@digikala/frontend`)
- The `layout.tsx` or `_document.tsx` will use the `BrandingConfig` for the `<title>` and `<meta>` tags.
- Assets will be copied/linked to `apps/frontend/public/branding/`.

#### Desktop (`@digikala/desktop`)
- The `package.json` for Electron-builder will be updated to point to the generated icons.
- Application windows will use the branding config for titles.

## 3. Approaches and Tradeoffs

### Approach: Static Build-time Generation (Recommended)
Generate all platform-specific assets during a pre-build phase.
- **Pros:** 
  - Guaranteed compatibility with Electron-builder.
  - Zero runtime overhead for asset resolution.
  - Consistent branding across all platforms.
- **Cons:** 
  - Requires a small generation step when branding changes.

## 4. Implementation Plan

1.  **Scaffold Library:** Create `libs/branding` using Nx generators.
2.  **Migrate Logos:** Move `temp-logo/*` to `libs/branding/assets/`.
3.  **Define Config:** Create naming constants in the library.
4.  **Generation Script:** Implement basic file copying and manifest generation.
5.  **Wire up Apps:**
    - Update `@digikala/frontend` to import branding constants.
    - Update `@digikala/desktop` to use generated icons.

## 5. Verification Plan
- **Linting:** Ensure the new library passes lint checks.
- **Visual Check:** Verify the web app shows the new favicon and title.
- **Build Check:** Ensure `electron-builder` correctly packages the new icon.
