// Declaration file so TypeScript knows about window.electronAPI
// injected by the Electron preload script.
export {};

declare global {
  interface Window {
    electronAPI?: {
      getSettings: () => Promise<DigikalaSettingsState>;
      saveSettings: (settings: DigikalaSettingsPayload) => Promise<{ success: boolean; error?: string }>;
      onLogMessage: (cb: (log: LogEntry) => void) => () => void;
      runUpload: (csvPath: string) => Promise<{ success: boolean; results?: unknown[]; error?: string }>;
      onUploadProgress: (cb: (data: IpcProgressEvent) => void) => () => void;
      runVariantCreation: (products: unknown[], config: Record<string, unknown>, dryRun: boolean) => Promise<{ success: boolean; results?: unknown[]; error?: string }>;
      onVariantProgress: (cb: (data: IpcProgressEvent) => void) => () => void;
      pickCsvPath: () => Promise<string | null>;
    };
  }
}

export interface LogEntry {
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  data?: Record<string, unknown>;
}

export interface IpcProgressEvent {
  index: number;
  total: number;
  title: string;
  status: string;
}

export interface DigikalaSettingsPayload {
  cookie: string;
  baseUrl?: string;
  referer?: string;
  timeoutMs?: number;
  maxRetries?: number;
  retryDelayMs?: number;
}

export interface DigikalaSettingsState {
  configured: boolean;
  hasCookie?: boolean;
  baseUrl?: string;
  referer?: string;
  timeoutMs?: number;
  maxRetries?: number;
  retryDelayMs?: number;
}
