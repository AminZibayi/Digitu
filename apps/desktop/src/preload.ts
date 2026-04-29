import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from './ipcContracts';

contextBridge.exposeInMainWorld('electronAPI', {
    // Dashboard
    getStats: () => ipcRenderer.invoke('get-stats'),

    // Settings
    getSettings: () => ipcRenderer.invoke('get-settings'),
    saveSettings: (settings: Record<string, unknown>) => ipcRenderer.invoke('save-settings', settings),

    // Shared
    onLogMessage: (callback: (log: any) => void) => {
        const listener = (_event: unknown, log: any) => callback(log);
        ipcRenderer.on('log-message', listener);
        return () => ipcRenderer.removeListener('log-message', listener);
    },

    // Uploader
    runUpload: (csvPath: string, autoPublish?: boolean) => ipcRenderer.invoke('run-upload', csvPath, autoPublish),
    onUploadProgress: (callback: (data: any) => void) => {
        const listener = (_event: unknown, data: any) => callback(data);
        ipcRenderer.on('upload-progress', listener);
        return () => ipcRenderer.removeListener('upload-progress', listener);
    },

    // Variant Creator
    runVariantCreation: (products: any[], config: any, dryRun: boolean) => 
        ipcRenderer.invoke('run-variant-creation', products, config, dryRun),
    onVariantProgress: (callback: (data: any) => void) => {
        const listener = (_event: unknown, data: any) => callback(data);
        ipcRenderer.on('variant-progress', listener);
        return () => ipcRenderer.removeListener('variant-progress', listener);
    },

    pickCsvPath: () => ipcRenderer.invoke('pick-csv-path'),

    // Logging
    log: (level: string, message: string, data?: any) => {
        ipcRenderer.send(IPC_CHANNELS.LOG_WRITE, { level, message, data });
    },
});
