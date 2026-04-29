# Project-wide Logging with Pino Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the custom core logger with Pino to capture persistent, redacted, structured logs across backend, frontend, desktop, and services, and provide a real-time UI.

**Architecture:** Core exports a configured Pino logger and a child-logger factory. Backend uses `pino-http` and hosts ingestion (`/api/log`) and streaming (`/api/logs/stream`) endpoints. Desktop bridges renderer logs via IPC. Frontend catches errors and provides a WebSocket-based log viewer.

**Tech Stack:** `pino`, `pino-http`, `pino-pretty`, Node.js `fs`, Express, WebSockets (`ws`), Next.js.

---

### Task 1: Update Core Logger with Pino

**Files:**
- Modify: `libs/core/package.json`
- Modify: `libs/core/src/Logger.ts`

- [ ] **Step 1: Install dependencies**
```bash
pnpm --filter @digikala/core add pino
pnpm --filter @digikala/core add -D pino-pretty @types/pino
```

- [ ] **Step 2: Rewrite `Logger.ts`**
```typescript
// libs/core/src/Logger.ts
import pino from 'pino';
import fs from 'fs';
import path from 'path';

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, `digikala-auto-${new Date().toISOString().split('T')[0]}.log`);

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: { destination: logFile, mkdir: true },
      level: process.env.LOG_LEVEL || 'info',
    },
    ...(process.env.NODE_ENV === 'development'
      ? [{ target: 'pino-pretty', options: { colorize: true }, level: 'debug' }]
      : []),
  ],
});

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: ['*.cookie', '*.authorization', '*.token', '*.password', 'req.headers.cookie', 'res.headers.set-cookie'],
    censor: '[Redacted]',
  },
}, transport);

export function createLogger(component: string) {
  return logger.child({ component });
}

// Catch uncaught exceptions to ensure they are logged before crashing
if (typeof process !== 'undefined') {
  process.on('uncaughtException', (err) => {
    logger.fatal({ err }, 'Uncaught Exception');
    process.exit(1);
  });
  process.on('unhandledRejection', (reason) => {
    logger.fatal({ reason }, 'Unhandled Rejection');
    process.exit(1);
  });
}
```

- [ ] **Step 3: Run build to verify core compiles**
```bash
pnpm --filter @digikala/core build
```
Expected: PASS

- [ ] **Step 4: Commit**
```bash
git add libs/core/package.json libs/core/src/Logger.ts
git commit -m "feat(core): replace custom logger with pino"
```

### Task 2: Backend Middleware and Ingestion Endpoints

**Files:**
- Modify: `apps/backend/package.json`
- Modify: `apps/backend/src/index.ts`
- Modify: `apps/backend/src/apiError.ts`

- [ ] **Step 1: Install dependencies**
```bash
pnpm --filter backend add pino-http ws
pnpm --filter backend add -D @types/ws
```

- [ ] **Step 2: Update `apiError.ts`**
```typescript
// apps/backend/src/apiError.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '@digikala/core';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error({ err, req: { method: req.method, url: req.url, body: req.body } }, 'API Error');
  res.status(500).json({ error: err.message || 'Internal Server Error' });
}
```

- [ ] **Step 3: Add middleware and routes to `index.ts`**
```typescript
// Add imports to apps/backend/src/index.ts
import pinoHttp from 'pino-http';
import { logger } from '@digikala/core';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import fs from 'fs';
import path from 'path';

// ... inside initialization before routes ...
app.use(pinoHttp({ logger }));
app.use(express.json());

// Frontend ingestion endpoint
app.post('/api/log', (req, res) => {
  const { level = 'info', message, data, source } = req.body;
  const logMethod = (logger as any)[level] || logger.info;
  logMethod.call(logger, { source, ...data }, message);
  res.json({ success: true });
});

// ... near the bottom, replace app.listen with server.listen ...
const server = createServer(app);
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  if (request.url === '/api/logs/stream') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

wss.on('connection', (ws) => {
  const logDir = path.join(process.cwd(), 'logs');
  const logFile = path.join(logDir, `digikala-auto-${new Date().toISOString().split('T')[0]}.log`);
  
  if (fs.existsSync(logFile)) {
    // Tail the file simply by watching changes (naive implementation for spec)
    let size = fs.statSync(logFile).size;
    const watcher = fs.watch(logFile, () => {
      const stats = fs.statSync(logFile);
      if (stats.size > size) {
        const stream = fs.createReadStream(logFile, { start: size, end: stats.size });
        stream.on('data', (chunk) => {
          ws.send(chunk.toString());
        });
        size = stats.size;
      }
    });
    ws.on('close', () => watcher.close());
  }
});

// Use server.listen instead of app.listen
server.listen(port, () => {
  logger.info(`Backend listening on port ${port}`);
});
```

- [ ] **Step 4: Build backend to verify**
```bash
pnpm --filter backend build
```
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add apps/backend/package.json apps/backend/src/index.ts apps/backend/src/apiError.ts
git commit -m "feat(backend): add pino-http, log ingestion, and log streaming"
```

### Task 3: Desktop IPC Logging

**Files:**
- Modify: `apps/desktop/src/ipcContracts.ts`
- Modify: `apps/desktop/src/preload.ts`
- Modify: `apps/desktop/src/main.ts`

- [ ] **Step 1: Add IPC Contract**
```typescript
// Add to apps/desktop/src/ipcContracts.ts
export const IPC_CHANNELS = {
  // ... existing ...
  LOG_WRITE: 'log:write'
} as const;
```

- [ ] **Step 2: Expose preload API**
```typescript
// Modify apps/desktop/src/preload.ts
import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from './ipcContracts';

contextBridge.exposeInMainWorld('electron', {
  // ... existing ...
  log: (level: string, message: string, data?: any) => {
    ipcRenderer.send(IPC_CHANNELS.LOG_WRITE, { level, message, data });
  }
});
```

- [ ] **Step 3: Handle in Main Process**
```typescript
// Add to apps/desktop/src/main.ts
import { logger } from '@digikala/core';
// ... inside setup window / IPC listeners
ipcMain.on(IPC_CHANNELS.LOG_WRITE, (_, { level, message, data }) => {
  const logMethod = (logger as any)[level] || logger.info;
  logMethod.call(logger, { source: 'desktop-renderer', ...data }, message);
});
```

- [ ] **Step 4: Commit**
```bash
git add apps/desktop/src/ipcContracts.ts apps/desktop/src/preload.ts apps/desktop/src/main.ts
git commit -m "feat(desktop): forward renderer logs to main logger via IPC"
```

### Task 4: Frontend Log Tailing UI & Reporting

**Files:**
- Modify: `apps/frontend/src/lib/api.ts`
- Create: `apps/frontend/src/components/ClientErrorBoundary.tsx`
- Modify: `apps/frontend/src/app/layout.tsx`
- Create: `apps/frontend/src/app/logs/page.tsx`

- [ ] **Step 1: Add API helper**
```typescript
// Add to apps/frontend/src/lib/api.ts
export async function reportLog(level: string, message: string, data?: any) {
  try {
    if (typeof window !== 'undefined' && (window as any).electron) {
      (window as any).electron.log(level, message, data);
      return;
    }
    await fetch('http://localhost:3001/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, data, source: 'frontend' })
    });
  } catch (e) {
    console.error('Failed to report log', e);
  }
}
```

- [ ] **Step 2: Error Boundary**
```tsx
// Create apps/frontend/src/components/ClientErrorBoundary.tsx
'use client';
import { Component, ReactNode } from 'react';
import { reportLog } from '../lib/api';

export class ClientErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) {
    reportLog('error', error.message, { stack: error.stack });
  }
  render() {
    if (this.state.hasError) return <div>Something went wrong.</div>;
    return this.props.children;
  }
}
```
*Wrap children in `app/layout.tsx` with `<ClientErrorBoundary>`.*

- [ ] **Step 3: Logs UI Page**
```tsx
// Create apps/frontend/src/app/logs/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function LogsPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const ws = new WebSocket('ws://localhost:3001/api/logs/stream');
    ws.onmessage = (event) => {
      const lines = event.data.split('\n').filter(Boolean);
      setLogs(prev => [...prev, ...lines].slice(-1000)); // keep last 1000
    };
    return () => ws.close();
  }, [paused]);

  return (
    <div className="p-4 h-screen flex flex-col">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Real-time Logs</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setPaused(!paused)}>
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button className="px-4 py-2 bg-red-200 rounded" onClick={() => setLogs([])}>Clear</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-black text-green-400 p-4 font-mono text-sm rounded">
        {logs.map((log, i) => (
          <div key={i} className="whitespace-pre-wrap mb-1">{log}</div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Build frontend to verify**
```bash
pnpm --filter frontend build
```
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add apps/frontend/src/lib/api.ts apps/frontend/src/components/ClientErrorBoundary.tsx apps/frontend/src/app/layout.tsx apps/frontend/src/app/logs/page.tsx
git commit -m "feat(frontend): add error boundary and real-time logs UI"
```
