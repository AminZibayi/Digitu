import { contextBridge, ipcRenderer } from 'electron';

interface IpcResult {
    success: boolean;
    error?: string;
    results?: unknown[];
}

interface IpcProgressEvent {
    index: number;
    total: number;
    title: string;
    status: string;
}

interface DigikalaSettingsPayload {
    cookie: string;
    baseUrl?: string;
    referer?: string;
    timeoutMs?: number;
    maxRetries?: number;
    retryDelayMs?: number;
}

type VariantCreationProductsInput = unknown[];
type VariantCreationConfigInput = Record<string, unknown>;

contextBridge.exposeInMainWorld('electronAPI', {
    getStats: () => ipcRenderer.invoke('get-stats'),

    // Settings
    getSettings: () => ipcRenderer.invoke('get-settings'),
    saveSettings: (settings: DigikalaSettingsPayload) => ipcRenderer.invoke('save-settings', settings) as Promise<IpcResult>,

    // Shared
    onLogMessage: (callback: (log: unknown) => void) => {
        const listener = (_event: unknown, log: unknown) => callback(log);
        ipcRenderer.on('log-message', listener);
        return () => ipcRenderer.removeListener('log-message', listener);
    },

    // Uploader
    runUpload: (csvPath: string) => ipcRenderer.invoke('run-upload', csvPath) as Promise<IpcResult>,
    onUploadProgress: (callback: (data: IpcProgressEvent) => void) => {
        const listener = (_event: unknown, data: IpcProgressEvent) => callback(data);
        ipcRenderer.on('upload-progress', listener);
        return () => ipcRenderer.removeListener('upload-progress', listener);
    },

    // Variant Creator
    runVariantCreation: (products: VariantCreationProductsInput, config: VariantCreationConfigInput, dryRun: boolean) => 
        ipcRenderer.invoke('run-variant-creation', products, config, dryRun) as Promise<IpcResult>,
    onVariantProgress: (callback: (data: IpcProgressEvent) => void) => {
        const listener = (_event: unknown, data: IpcProgressEvent) => callback(data);
        ipcRenderer.on('variant-progress', listener);
        return () => ipcRenderer.removeListener('variant-progress', listener);
    },

    pickCsvPath: () => ipcRenderer.invoke('pick-csv-path'),
});
