# Variants Page Redesign

## Objective
Update the `/variants/` page to match the visual consistency of the rest of the application (like `/uploader/`), follow UI rules (using `glass-card`, `btn-primary`, and CSS variables), and translate the English text to Persian.

## Terminology
- Variant Creator: ایجادکننده تنوع
- Fixture: فیکسچر (or default if contextually implied)
- Select Fixture: انتخاب فیکسچر
- Upload CSV: آپلود CSV

## Architecture & Layout
The page will adopt the `max-w-3xl mx-auto space-y-6` container structure.

### 1. Header
- Title: `آپلود تنوع‌ها` or `ایجادکننده تنوع` (`h1` with `text-2xl font-bold`)
- Subtitle: A small description explaining the page's purpose (`text-sm text-[var(--foreground-muted)]`).

### 2. Unified Fixture Card
A single `glass-card` component encompassing both selecting existing fixtures and uploading new ones.
- **Top Section**: Dropdown (`select`) for existing fixtures + "Refresh" (`btn-ghost`) button.
- **Separator**: A visual separator or "یا" (OR).
- **Bottom Section**: Text input for new fixture name + File input for CSV + "Upload CSV" (`btn-ghost`) button.
Inputs will use the standard class: `bg-[var(--surface-alt)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)] transition-colors`.

### 3. Action Section
A button to run the creator.
- Class: `btn-primary`
- Text: `شروع ایجاد تنوع` (or `در حال اجرا…` when loading)

## Data Flow
The React state logic remains exactly the same as the existing `variants/page.tsx`:
- `fixtures` state from API
- `selected` state for dropdown
- `file` and `newName` states for upload
- `running` state for execution.

No changes to the API calls (`fetchFixtures`, `uploadCSVFixture`, `runVariantFixture`).