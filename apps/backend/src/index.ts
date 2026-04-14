import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { Database, DigikalaClient, DigikalaSettings, logger } from '@digikala/core';
import { ProductUploaderService } from '@digikala/product-uploader';
import { VariantCreatorService } from '@digikala/variant-creator';
import { SettingsStore } from './SettingsStore';
import { buildNormalizedSettingsPayload, parseUploadRequest, parseVariantCreationRequest } from './requestValidation';
import { buildStatsPayload, loadStatsPayload } from './stats';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
const dbPath = path.join(dbDir, 'digikala-auto.sqlite');
const settingsPath = path.join(dbDir, 'digikala-settings.secure.json');

const db = new Database(dbPath);
const settingsStore = new SettingsStore(settingsPath, process.env.DIGIKALA_SETTINGS_SECRET || '');
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
    throw new Error('Digikala settings are not configured. Open Settings and save credentials first.');
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

logger.on('log', (entry) => {
  broadcastSse('log-message', entry);
});

logger.info('Backend API initialized', { dbPath, hasSettings: Boolean(settings) });

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

app.get('/api/stats', (_req, res) => {
  try {
    const { productsUploaded, variantsCreated, lastRunAt } = loadStatsPayload(dbPath);
    res.json({ success: true, stats: buildStatsPayload({ productsUploaded, variantsCreated, lastRunAt }) });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to load stats';
    logger.error('Failed to load stats', { error: message });
    res.status(500).json({ success: false, error: message });
  }
});

app.post('/api/settings', (req, res) => {
  try {
    const normalized = buildNormalizedSettingsPayload(req.body, settings?.cookie ?? null);
    settings = settingsStore.save(normalized);
    logger.info('Digikala settings saved');
    res.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to save settings';
    logger.error('Failed to save settings', { error: message });
    res.status(400).json({ success: false, error: message });
  }
});

app.post('/api/upload', async (req, res) => {
  try {
    const { csvPath } = parseUploadRequest(req.body);
    logger.info('Received HTTP: run-upload', { csvPath });
    const services = getServices();
    const results = await services.uploader.runUpload(
      csvPath,
      (index, total, title, status) => {
        broadcastSse('upload-progress', { index, total, title, status });
      }
    );
    res.json({ success: true, results });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Upload failed';
    logger.error('Upload completely failed', { error: message });
    res.status(500).json({ success: false, error: message });
  }
});

app.post('/api/variant-creation', async (req, res) => {
  try {
    const { products, config, dryRun } = parseVariantCreationRequest(req.body);
    logger.info('Received HTTP: run-variant-creation', { products: products.length, dryRun });
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
    const message = error instanceof Error ? error.message : 'Variant creation failed';
    logger.error('Variant creation completely failed', { error: message });
    res.status(500).json({ success: false, error: message });
  }
});

const frontendOutPath = path.join(__dirname, '..', '..', 'frontend', 'out');
app.use(express.static(frontendOutPath));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Backend listening on port ${PORT}`);
  logger.info(`Serving static files from ${frontendOutPath}`);
});
