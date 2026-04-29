# Spec: Project-wide Logging with Structured Logger

## Summary

Replace the existing `libs/core/src/Logger.ts` console-only logger with Pino, a high-performance structured logging library. Provide centralized, persistent, redacted logging across backend API, frontend web app, desktop Electron app, and all service libraries.

## Goals
- Capture errors persistently (not just console output).
- Unify log format across all packages and apps.
- Redact sensitive data automatically (cookies, tokens, passwords).
- Enable backend request/response trace logging.
- Forward frontend and desktop renderer errors to the main log stream.
- Provide real-time log tailing UI in the frontend.
- Maintain backward-compatible `logger.error/info/debug/warn` API so existing services require minimal changes.

## Non-Goals
- Distributed tracing or OpenTelemetry integration.
- Log aggregation to external services (Datadog, etc.).

## Architecture

### 1. Core Logger (`libs/core/src/Logger.ts`)

Replace the custom `EventEmitter`-based logger with Pino.

- **Default export**: `logger` — root Pino instance.
- **Factory**: `createLogger(name: string)` — returns a child logger with `component: name` in every log line.
- **Level**: Controlled by `LOG_LEVEL` env var (`fatal`, `error`, `warn`, `info`, `debug`, `trace`). Default: `info`.
- **Transports**:
  - Production/file mode: JSON lines to `logs/digikala-auto-%DATE%.log` with daily rotation (or size-based if simpler).
  - Dev mode: pretty-print to stdout via `pino-pretty` (dev dependency only).
- **Redaction**: Pino built-in `redact` configured for paths: `*.cookie`, `*.authorization`, `*.token`, `*.password`, `req.headers.cookie`, `res.headers.set-cookie`.

### 2. Backend (`apps/backend/src/index.ts` + `apiError.ts`)

- Add `pino-http` middleware for automatic request/response logging.
- Update the global error middleware (`apiError.ts`) to log errors via `logger.error(err, { req, res })` before sending the response.
- Add a new `POST /api/log` endpoint that accepts `{ level, message, data?, source: 'frontend' }` and writes it through the core logger. This endpoint is the ingestion point for client-side errors.

### 3. Frontend (`apps/frontend`)
- In `lib/api.ts`, add a `reportLog(level, message, data)` helper that POSTs to `/api/log`.
- In `app/layout.tsx` or a new error boundary, catch unhandled errors and call `reportLog('error', error.message, { stack: error.stack })`.
- Any explicit `console.error` in frontend components should be replaced with the report helper.
- Add a new page at `/logs` (or a panel in the existing console) that displays real-time logs.
  - The page opens a WebSocket connection to `/api/logs/stream`.
  - The backend streams new log lines (in JSON lines format) as they are written.
  - The frontend parses each line and appends it to a virtualized list (e.g., using `react-window`).
  - Provide controls to pause/resume, clear, and download the log.
  - Log levels can be filtered via a dropdown.

### 4. Desktop (`apps/desktop/src/main.ts`, `preload.ts`, `ipcContracts.ts`)

- Main process imports `logger` from `@digikala/core` directly.
- Preload exposes `window.electron.log(level, message, data)` → IPC `log:write`.
- Main process listens on `log:write` and forwards to `logger[level](message, data)`.
- Catch `uncaughtException` and `unhandledRejection` in main process and log at `fatal`/`error` level.

### 5. Services (`libs/services/*`)

- No API changes. They already `import { logger } from '@digikala/core'`. The implementation swap is transparent.
- Ensure `product-uploader` and `variant-creator` wrap their top-level entry points with try/catch that log uncaught errors before re-throwing.

## Data Flow

```
Frontend (Next.js)
  error boundary / api.ts
    → POST /api/log
      → apps/backend logger.error/warn
        → libs/core Pino → file + stdout

Desktop Renderer
  window.electron.log()
    → IPC log:write
      → apps/desktop main.ts
        → libs/core Pino → file + stdout

Backend API
  pino-http middleware
    → auto log every req/res
  apiError.ts
    → logger.error(err, { req })
      → libs/core Pino → file + stdout

Services (CLI / Lib)
  logger.info/error/debug
    → libs/core Pino → file + stdout
```

## Error Handling

- **Uncaught exceptions** in backend/desktop/services: attach a one-time `process.on('uncaughtException')` handler in the core logger setup that logs at `fatal` and flushes the Pino destination before exit.
- **Log write failures**: Pino writes to `stderr` if the destination stream fails. Accept this default behavior.
- **Missing log directory**: If `logs/` does not exist, Pino's destination stream should create it. Add a `mkdirSync` guard in the core logger factory if needed.

## Configuration

| Env Var     | Default                  | Description                                        |
| ----------- | ------------------------ | -------------------------------------------------- |
| `LOG_LEVEL` | `info`                   | Minimum level to log                               |
| `LOG_FILE`  | `logs/digikala-auto.log` | Base log file path                                 |
| `NODE_ENV`  | —                        | When `development`, enable `pino-pretty` on stdout |

## Dependencies

- Add `pino` to `libs/core` dependencies.
- Add `pino-http` to `apps/backend` dependencies.
- Add `pino-pretty` to workspace root or `libs/core` dev dependencies.

## Testing Considerations

- Verify log file is created and contains JSON lines after running backend.
- Verify redaction: log a request with `Cookie` header and confirm the value is `[Redacted]`.
- Verify child loggers: `createLogger('uploader')` should include `"component":"uploader"` in every line.
- Verify desktop IPC: trigger an error in renderer and confirm it appears in the main log file.

## Migration Path

1. Install Pino dependencies.
2. Rewrite `libs/core/src/Logger.ts`.
3. Update `apps/backend/src/index.ts` to add `pino-http` middleware and `/api/log` route.
4. Update `apps/desktop/src/main.ts` and `preload.ts` for IPC logging.
5. Update `apps/frontend/src/lib/api.ts` and add error reporting boundary.
6. Remove any remaining direct `console.log/error` calls in backend/desktop/services (optional cleanup).

## Files to Modify / Create

- `libs/core/src/Logger.ts` — rewrite
- `libs/core/package.json` — add `pino` dependency
- `apps/backend/src/index.ts` — add middleware and route
- `apps/backend/src/apiError.ts` — update error logging
- `apps/backend/package.json` — add `pino-http`
- `apps/desktop/src/main.ts` — add IPC listener and uncaught handlers
- `apps/desktop/src/preload.ts` — expose `log` API
- `apps/desktop/src/ipcContracts.ts` — add `log:write` contract
- `apps/frontend/src/lib/api.ts` — add `reportLog` helper
- `apps/frontend/src/app/layout.tsx` or new error boundary — catch and report errors
