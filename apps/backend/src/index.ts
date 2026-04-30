console.log("Starting backend script...");
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import http from 'http';
import pinoHttp from 'pino-http';
import { WebSocket, WebSocketServer } from 'ws';
import { buildStatsPayload, Database, DigikalaClient, DigikalaSettings, loadStatsPayload, logger } from '@digikala/core';
import { ProductUploaderService } from '@digikala/product-uploader';
import { VariantCreatorService, listFixtures, loadFixture, saveFixture, deleteFixture, parseCSVToFixture } from '@digikala/variant-creator';
import { SettingsStore } from './SettingsStore';
import { getMasterKey } from './masterKey';
import { ApiError, toApiErrorPayload } from './apiError';
import { buildNormalizedSettingsPayload, parseUploadRequest, parseVariantCreationRequest } from './requestValidation';

const app = express();
app.use(cors());
app.use(pinoHttp({ 
  logger,
  autoLogging: {
    ignore: (req) => req.url === '/api/events' || req.url === '/api/logs/stream'
  }
}));
app.use(express.json({ limit: '50mb' }));

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  const logHandler = (entry: any) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(entry));
    }
  };
  
  logger.on('log', logHandler);
  
  ws.on('close', () => {
    logger.off('log', logHandler);
  });
});

server.on('upgrade', (request, socket, head) => {
  const { pathname } = new URL(request.url || '', `http://${request.headers.host}`);
  if (pathname === '/api/logs/stream') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
const dbPath = path.join(dbDir, 'digikala-auto.pglite');
const settingsPath = path.join(dbDir, 'digikala-settings.secure.json');

let db: Database;
const masterKey = getMasterKey(dbDir);
const settingsStore = new SettingsStore(settingsPath, masterKey);
let settings: DigikalaSettings | null = null;
try {
  settings = settingsStore.load();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'unknown error';
  logger.warn('Failed to load secure settings at startup', { error: message });
}

const buildClient = (cfg: DigikalaSettings): DigikalaClient =>
  new DigikalaClient({
    cookie: cfg.cookie,
    baseUrl: cfg.baseUrl,
    referer: cfg.referer,
    timeoutMs: cfg.timeoutMs,
    maxRetries: cfg.maxRetries,
    retryDelayMs: cfg.retryDelayMs,
  });

const getServices = (): { uploader: ProductUploaderService; creator: VariantCreatorService } => {
  if (!settings) {
    throw new ApiError(
      'SETTINGS_NOT_CONFIGURED',
      'Digikala settings are not configured. Open Settings and save credentials first.',
      400,
    );
  }
  const client = buildClient(settings);
  return {
    uploader: new ProductUploaderService(client, db),
    creator: new VariantCreatorService(client, db),
  };
};

let sseClients: express.Response[] = [];

function broadcastSse(event: string, data: unknown) {
  sseClients.forEach(client => {
    client.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  });
}

logger.on('log', (entry: any) => {
  broadcastSse('log-message', entry);
});

app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseClients.push(res);

  req.on('close', () => {
    sseClients = sseClients.filter(c => c !== res);
  });
});

app.get('/api/settings', (_req, res) => {
  res.json({
    success: true,
    settings: settings
      ? {
          configured: true,
          hasCookie: Boolean(settings.cookie),
          baseUrl: settings.baseUrl,
          referer: settings.referer,
          timeoutMs: settings.timeoutMs,
          maxRetries: settings.maxRetries,
          retryDelayMs: settings.retryDelayMs,
        }
      : { configured: false },
  });
});

app.get('/api/stats', async (req, res) => {
  try {
    const { productsUploaded, variantsCreated, lastRunAt } = await loadStatsPayload(dbPath);
    res.json({ success: true, stats: buildStatsPayload({ productsUploaded, variantsCreated, lastRunAt }) });
  } catch (error: unknown) {
    const payload = toApiErrorPayload(error, req, 'STATS_LOAD_FAILED', 'Failed to load stats', 500);
    res.status(payload.status).json({
      success: false,
      error: { code: payload.code, message: payload.message },
    });
  }
});

app.post('/api/log', (req, res) => {
  const { level, message, data } = req.body;
  const levelName = level || 'info';
  if (logger[levelName] && typeof logger[levelName] === 'function') {
    logger[levelName](data || {}, message);
  } else {
    logger.info(data || {}, message);
  }
  res.status(204).end();
});

app.post('/api/settings', (req, res) => {
  try {
    const normalized = buildNormalizedSettingsPayload(req.body, settings?.cookie ?? null);
    settings = settingsStore.save(normalized);
    logger.info('Digikala settings saved');
    res.json({ success: true });
  } catch (error: unknown) {
    const payload = toApiErrorPayload(error, req, 'SETTINGS_SAVE_FAILED', 'Failed to save settings', 400);
    res.status(payload.status).json({
      success: false,
      error: { code: payload.code, message: payload.message },
    });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    const { csvPath, autoPublish } = parseUploadRequest(req.body);
    logger.info('Received HTTP: run-upload', { csvPath, autoPublish });
    const services = getServices();
    const results = await services.uploader.runUpload(
      csvPath,
      autoPublish,
      (index, total, title, status) => {
        broadcastSse('upload-progress', { index, total, title, status });
      }
    );
    res.json({ success: true, results });
  } catch (error: unknown) {
    const payload = toApiErrorPayload(error, req, 'UPLOAD_FAILED', 'Upload failed', 500);
    res.status(payload.status).json({
      success: false,
      error: { code: payload.code, message: payload.message },
    });
  }
});

const variantRouter = express.Router();
const fixturesDir = path.join(process.cwd(), 'fixtures');
if (!fs.existsSync(fixturesDir)) fs.mkdirSync(fixturesDir, { recursive: true });

variantRouter.get('/fixtures', (req, res) => {
  res.json({ fixtures: listFixtures(fixturesDir) });
});

variantRouter.post('/fixtures', (req, res) => {
  const { name, content } = req.body;
  saveFixture(fixturesDir, name, content);
  res.json({ success: true });
});

variantRouter.delete('/fixtures/:name', (req, res) => {
  deleteFixture(fixturesDir, req.params.name);
  res.json({ success: true });
});

variantRouter.post('/fixtures/:name/upload-csv', express.text({ type: 'text/csv' }), (req, res) => {
  const content = parseCSVToFixture(req.body);
  saveFixture(fixturesDir, req.params.name, content);
  res.json({ success: true, count: content.length });
});

variantRouter.post('/run', async (req, res) => {
  try {
    const { fixture, config, dryRun } = parseVariantCreationRequest(req.body);
    logger.info('Received HTTP: run-variant-creation', { fixture, dryRun });
    const products = loadFixture(fixturesDir, fixture);
    
    if (!products || products.length === 0) {
      throw new ApiError('INVALID_REQUEST', 'fixture must contain at least one product', 400);
    }
    
    const services = getServices();
    const results = await services.creator.runCreation(
      products,
      config,
      dryRun,
      (index, total, title, status) => {
        broadcastSse('variant-progress', { index, total, title, status });
      }
    );
    res.json({ success: true, results });
  } catch (error: unknown) {
    const payload = toApiErrorPayload(error, req, 'VARIANT_CREATION_FAILED', 'Variant creation failed', 500);
    res.status(payload.status).json({
      success: false,
      error: { code: payload.code, message: payload.message },
    });
  }
});

app.use('/api/variants', variantRouter);

const frontendOutPath = path.join(__dirname, '..', '..', 'frontend', 'out');
app.use(express.static(frontendOutPath));

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  console.log("Entering bootstrap...");
  db = await Database.create(dbPath);
  console.log("Database initialized");
  logger.info('Backend API initialized', { dbPath, hasSettings: Boolean(settings) });

  server.listen(PORT, () => {
    logger.info(`Backend listening on port ${PORT}`);
    logger.info(`Serving static files from ${frontendOutPath}`);
  });
}

bootstrap().catch((err) => {
  logger.error('Failed to start backend', { error: err.message });
  process.exit(1);
});
