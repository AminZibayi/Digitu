// Declaration file so TypeScript knows about window.electronAPI
// injected by the Electron preload script.
export {};

declare global {
  interface Window {
    electronAPI?: {
      getStats: () => Promise<{ productsUploaded: number; variantsCreated: number; lastRunAt: string | null }>;
      getSettings: () => Promise<DigikalaSettingsState>;
      saveSettings: (settings: DigikalaSettingsPayload) => Promise<IpcHandlerResult>;
      onLogMessage: (cb: (log: LogEntry) => void) => () => void;
      runUpload: (csvPath: string, autoPublish?: boolean) => Promise<IpcHandlerResult>;
      onUploadProgress: (cb: (data: IpcProgressEvent) => void) => () => void;
      runVariantCreation: (products: VariantCreationProductsInput, config: VariantCreationConfigInput, dryRun: boolean) => Promise<IpcHandlerResult>;
      onVariantProgress: (cb: (data: IpcProgressEvent) => void) => () => void;
      pickCsvPath: () => Promise<string | null>;
    };
  }
}

export interface IpcHandlerResult {
  success: boolean;
  results?: unknown[];
  error?: string | ApiErrorResponse;
}

export interface ApiErrorResponse {
  code?: string;
  message?: string;
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
  error?: string;
}

export interface DigikalaSettingsPayload {
  cookie: string;
  baseUrl?: string;
  referer?: string;
  timeoutMs?: number;
  maxRetries?: number;
  retryDelayMs?: number;
}

export type VariantCreationProductsInput = unknown[];
export type VariantCreationConfigInput = Record<string, unknown>;

export interface DigikalaSettingsState {
  configured: boolean;
  hasCookie?: boolean;
  baseUrl?: string;
  referer?: string;
  timeoutMs?: number;
  maxRetries?: number;
  retryDelayMs?: number;
}
