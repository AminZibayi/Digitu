import { ApiErrorResponse, DigikalaSettingsPayload, DigikalaSettingsState, LogEntry, IpcProgressEvent } from '../app/globals.d';

const isElectron = typeof window !== 'undefined' && !!window.electronAPI;
const API_BASE = isElectron ? '' : (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '');

let eventSource: EventSource | null = null;
const listeners = {
  'log-message': new Set<(data: LogEntry) => void>(),
  'upload-progress': new Set<(data: IpcProgressEvent) => void>(),
  'variant-progress': new Set<(data: IpcProgressEvent) => void>(),
};

function ensureEventSource(): void {
  if (isElectron || typeof window === 'undefined' || eventSource) {
    return;
  }
  eventSource = new EventSource(`${API_BASE}/api/events`);

  eventSource.addEventListener('log-message', (e) => {
    const data = JSON.parse(e.data);
    listeners['log-message'].forEach((cb) => cb(data));
  });

  eventSource.addEventListener('upload-progress', (e) => {
    const data = JSON.parse(e.data);
    listeners['upload-progress'].forEach((cb) => cb(data));
  });

  eventSource.addEventListener('variant-progress', (e) => {
    const data = JSON.parse(e.data);
    listeners['variant-progress'].forEach((cb) => cb(data));
  });
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init);
  const json = await res.json();
  if (!res.ok || !json.success) {
    const errorPayload = toErrorPayload(json.error, res.status);
    throw new ApiRequestError(errorPayload.code, errorPayload.message);
  }
  return json as T;
}

export class ApiRequestError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

function toErrorPayload(error: unknown, status: number): { code: string; message: string } {
  if (typeof error === 'string') {
    return { code: 'UNKNOWN_ERROR', message: error };
  }

  if (error && typeof error === 'object') {
    const payload = error as ApiErrorResponse;
    const code = typeof payload.code === 'string' ? payload.code : 'UNKNOWN_ERROR';
    const message = typeof payload.message === 'string' ? payload.message : `Request failed: ${status}`;
    return { code, message };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: `Request failed: ${status}`,
  };
}

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

export const api = {
  getStats: async () => {
    if (isElectron) {
      return window.electronAPI!.getStats();
    }
    const json = await fetchJson<{ success: true; stats: { productsUploaded: number; variantsCreated: number; lastRunAt: string | null } }>('/api/stats');
    return json.stats;
  },

  getSettings: async (): Promise<DigikalaSettingsState> => {
    if (isElectron) {
      return window.electronAPI!.getSettings();
    }
    const json = await fetchJson<{ success: true; settings: DigikalaSettingsState }>('/api/settings');
    return json.settings;
  },

  saveSettings: async (settings: DigikalaSettingsPayload) => {
    if (isElectron) {
      return window.electronAPI!.saveSettings(settings);
    }
    return fetchJson<{ success: boolean; error?: string }>('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
  },

  onLogMessage: (cb: (log: LogEntry) => void) => {
    if (isElectron) {
      return window.electronAPI!.onLogMessage(cb);
    } else {
      ensureEventSource();
      listeners['log-message'].add(cb);
      return () => listeners['log-message'].delete(cb);
    }
  },

  runUpload: async (csvPath: string) => {
    if (isElectron) {
      return window.electronAPI!.runUpload(csvPath);
    } else {
      return fetchJson<{ success: boolean; results?: unknown[]; error?: string }>('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvPath }),
      });
    }
  },

  onUploadProgress: (cb: (data: IpcProgressEvent) => void) => {
    if (isElectron) {
      return window.electronAPI!.onUploadProgress(cb);
    } else {
      ensureEventSource();
      listeners['upload-progress'].add(cb);
      return () => listeners['upload-progress'].delete(cb);
    }
  },

  runVariantCreation: async (products: unknown[], config: Record<string, unknown>, dryRun: boolean) => {
    if (isElectron) {
      return window.electronAPI!.runVariantCreation(products, config, dryRun);
    } else {
      return fetchJson<{ success: boolean; results?: unknown[]; error?: string }>('/api/variant-creation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products, config, dryRun }),
      });
    }
  },

  onVariantProgress: (cb: (data: IpcProgressEvent) => void) => {
    if (isElectron) {
      return window.electronAPI!.onVariantProgress(cb);
    } else {
      ensureEventSource();
      listeners['variant-progress'].add(cb);
      return () => listeners['variant-progress'].delete(cb);
    }
  },

  pickCsvPath: async (): Promise<string | null> => {
    if (!isElectron) return null;
    return window.electronAPI!.pickCsvPath();
  },
};
