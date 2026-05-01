# Design Doc: Enable Terminal and File Logging for Backend

## Problem Statement
The backend currently logs only to local files in `apps/backend/logs`. There is no stdout/stderr output in the terminal, which makes local development and monitoring via Nx commands difficult.

## Goals
- Enable logging to both the terminal (stdout) and the log file.
- Use `pino-pretty` for readable terminal logs.
- Ensure reliability in a monorepo environment by avoiding worker-based `pino.transport` which can fail to resolve dependencies like `pino-pretty`.

## Proposed Solution
Refactor `@digikala/core`'s logger to use `pino.multistream` instead of `pino.transport`.

### 1. Dependency Changes
Move `pino-pretty` from `devDependencies` to `dependencies` in `libs/core/package.json`. This ensures the prettifier is available at runtime when used in `pino.multistream`.

### 2. Logger Architecture (`libs/core/src/Logger.ts`)
The current `pino.transport` configuration will be replaced with a `pino.multistream` setup.

#### Configuration:
- **Terminal Stream**: `pino-pretty({ colorize: true })` wrapping `process.stdout`.
- **File Stream**: `fs.createWriteStream(logFile, { flags: 'a' })`.
- **Level**: Both streams will inherit the log level from `process.env.LOG_LEVEL` or default to `info`.

#### Logic Flow:
1. Define the log file path based on the current date.
2. Initialize the file write stream.
3. Initialize the `pino-pretty` stream.
4. Pass an array of streams to `pino.multistream()`.
5. Create the base logger using the multi-stream.
6. The existing `createWrappedLogger` logic (for SSE events) will remain intact, as it wraps the base logger.

## Verification Plan
1. **Manual Check**: Run `pnpm dev` and verify that logs appear in the terminal with colors and are also appended to the latest file in `apps/backend/logs`.
2. **Build Check**: Run `nx build backend` and `nx build core` to ensure no compilation errors after dependency changes.
