# Spec: Migrate from better-sqlite3 to PGlite

## Goal
Replace the native `better-sqlite3` dependency with `@electric-sql/pglite` to improve environment compatibility and move towards a more standard PostgreSQL-compatible storage layer.

## Architecture Changes
- **Asynchronous DB Layer:** All database operations in `libs/core` will be converted from synchronous to asynchronous.
- **Initialization:** Replace the `Database` constructor with a static `create()` method to handle async PGlite initialization.
- **Downstream propagation:** `loadStatsPayload` and all service methods calling the database will become `async`. Callers in `apps/backend` and `apps/desktop` will be updated to `await` these calls.

## SQL & Type Changes
- **Placeholders:** Change `?` to `$1`, `$2`, etc.
- **Primary Keys:** Change `INTEGER PRIMARY KEY AUTOINCREMENT` to `SERIAL PRIMARY KEY`.
- **Timestamps:** Change `DATETIME` to `TIMESTAMP`.
- **Conflict Handling:** SQLite's `ON CONFLICT` will be kept as PostgreSQL supports similar syntax.
- **Storage:** Use a new data directory or filename (e.g., `digikala-auto.pglite`) for the fresh start to avoid conflicts with legacy SQLite files.

## Implementation Details
1.  **Dependencies:**
    -   Uninstall `better-sqlite3` and `@types/better-sqlite3`.
    -   Install `@electric-sql/pglite`.
2.  **Core Library:**
    -   Update `libs/core/src/Database.ts` to use `PGlite`.
    -   Convert all methods (`addProduct`, `getProduct`, `addVariantState`, etc.) to `async`.
    -   Update `libs/core/src/stats.ts` to be an `async` function.
3.  **Services:**
    -   Update `ProductUploaderService` and `VariantCreatorService` to `await` database operations.
4.  **Applications:**
    -   Update `apps/backend/src/index.ts` to await `Database.create()` and handle async stats/upload calls.
    -   Update `apps/desktop/src/main.ts` to await `Database.create()` and handle async IPC handlers.
5.  **Tests:**
    -   Update `tests/stats-api.test.ts` to use `async/await`.

## Verification
- Run `nx run-many -t test` to ensure all tests pass.
- Start `apps/backend` and verify `/api/stats` returns empty stats for the fresh DB.
- Build and run `apps/desktop` to ensure native module errors (previously caused by `better-sqlite3`) are resolved.
