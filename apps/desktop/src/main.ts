import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import serve from 'electron-serve';
import { Database, DigikalaClient, DigikalaSettings, loadStatsPayload, logger, normalizeDigikalaSettings } from '@digikala/core';
import { ProductUploaderService } from '@digikala/product-uploader';
import { VariantCreatorService } from '@digikala/variant-creator';
import { SettingsStore } from './SettingsStore';
import { IPC_CHANNELS, parseRunUploadInput, parseRunVariantCreationInput, parseSaveSettingsInput, toIpcErrorEnvelope } from './ipcContracts';
import { formatNativeModuleReadinessError } from './runtimeReadiness';
import { BRANDING } from '@digikala/branding';

const isDev = process.env.NODE_ENV !== 'production';

const appServe = serve({
    directory: isDev 
        ? path.join(__dirname, '../../frontend/out')
        : path.join(process.resourcesPath, 'frontend', 'out')
});

const dbPath = path.join(app.getPath('userData'), 'digikala-auto.sqlite');
const settingsPath = path.join(app.getPath('userData'), 'digikala-settings.secure.json');
let db: Database | null = null;
const settingsStore = new SettingsStore(settingsPath);
let settings: DigikalaSettings | null = null;

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
    try {
        db = new Database(dbPath);
    } catch (error: unknown) {
        dialog.showErrorBox('Startup Error', formatNativeModuleReadinessError(String(error)));
        app.quit();
        return;
    }

    try {
        settings = settingsStore.load();
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'unknown error';
        logger.warn('Failed to load encrypted settings', { error: message });
    }

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 860,
        minWidth: 900,
        minHeight: 600,
        title: BRANDING.displayName,
        icon: path.join(__dirname, process.platform === 'win32' ? '../assets/icon.ico' : '../assets/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    if (mainWindow) {
        appServe(mainWindow).then(() => {
            if (isDev) {
                mainWindow?.webContents.openDevTools();
            }
        });
    }

    logger.on('log', (entry: any) => {
        if (mainWindow && !mainWindow.isDestroyed()) {
            mainWindow.webContents.send('log-message', entry);
        }
    });

    logger.info('Electron backend initialized', { dbPath, hasSettings: Boolean(settings) });

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
        if (!db) {
            throw new Error('Database is not initialized.');
        }
        const client = buildClient(settings);
        return {
            uploader: new ProductUploaderService(client, db),
            creator: new VariantCreatorService(client, db),
        };
    };

    ipcMain.handle('get-settings', async () => {
        return settings
            ? {
                  configured: true,
                  hasCookie: Boolean(settings.cookie),
                  baseUrl: settings.baseUrl,
                  referer: settings.referer,
                  timeoutMs: settings.timeoutMs,
                  maxRetries: settings.maxRetries,
                  retryDelayMs: settings.retryDelayMs,
              }
            : { configured: false };
    });

    ipcMain.handle('get-stats', async () => loadStatsPayload(dbPath));

    ipcMain.handle('save-settings', async (_event, payload: unknown) => {
        try {
            const mergedPayload = parseSaveSettingsInput(payload, settings?.cookie ?? null);
            settings = settingsStore.save(normalizeDigikalaSettings(mergedPayload));
            logger.info('Digikala settings saved');
            return { success: true };
        } catch (error: unknown) {
            const failure = toIpcErrorEnvelope(error, 'Failed to save settings');
            logger.error('Failed to save settings', { error: failure.error });
            return failure;
        }
    });

    ipcMain.handle('run-upload', async (event, csvPath: unknown, autoPublish: unknown) => {
        try {
            const { csvPath: normalizedPath, autoPublish: isAutoPublish } = parseRunUploadInput(csvPath, autoPublish);
            logger.info('Received IPC: run-upload', { csvPath: normalizedPath, autoPublish: isAutoPublish });
            const services = getServices();
            const results = await services.uploader.runUpload(
                normalizedPath,
                isAutoPublish,
                (index, total, title, status) => {
                    event.sender.send('upload-progress', { index, total, title, status });
                },
            );
            return { success: true, results };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Upload failed';
            logger.error('Upload completely failed', { error: message });
            return { success: false, error: message };
        }
    });

    ipcMain.handle('run-variant-creation', async (event, products: unknown, config: unknown, dryRun: unknown) => {
        try {
            const parsedInput = parseRunVariantCreationInput(products, config, dryRun);
            logger.info('Received IPC: run-variant-creation', { products: parsedInput.products.length, dryRun: parsedInput.dryRun });
            const services = getServices();
            const results = await services.creator.runCreation(
                parsedInput.products,
                parsedInput.config,
                parsedInput.dryRun,
                (index, total, title, status) => {
                    event.sender.send('variant-progress', { index, total, title, status });
                },
            );
            return { success: true, results };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Variant creation failed';
            logger.error('Variant creation completely failed', { error: message });
            return { success: false, error: message };
        }
    });

    ipcMain.handle('pick-csv-path', async () => {
        if (!mainWindow) return null;
        const result = await dialog.showOpenDialog(mainWindow, {
            title: 'Select products CSV file',
            properties: ['openFile'],
            filters: [{ name: 'CSV files', extensions: ['csv'] }],
        });
        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }
        return result.filePaths[0];
    });

    ipcMain.on(IPC_CHANNELS.LOG_WRITE, (_, { level, message, data }) => {
        const logMethod = (logger as any)[level] || logger.info;
        logMethod.call(logger, { source: 'desktop-renderer', ...data }, message);
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (db) {
            db.close();
        }
        app.quit();
    }
});
