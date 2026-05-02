import { ApiErrorResponse, DigikalaSettingsPayload, DigikalaSettingsState, LogEntry, IpcProgressEvent } from '../app/globals.d';

const isElectron = typeof window !== 'undefined' && !!window.electronAPI;
const API_BASE = isElectron ? '' : (process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001' : '');

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

  eventSource.onerror = () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    setTimeout(() => {
      if (Object.values(listeners).some(set => set.size > 0)) {
        ensureEventSource();
      }
    }, 5000);
  };

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
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, init);
  } catch (error) {
    throw new ApiRequestError('NETWORK_ERROR', 'سرور در دسترس نیست یا اتصال قطع شده است');
  }

  let json: any;
  try {
    json = await res.json();
  } catch (error) {
    throw new ApiRequestError('INVALID_RESPONSE', 'پاسخ نامعتبر از سرور');
  }

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
    await fetch(`${API_BASE}/api/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message, data, source: 'frontend' })
    });
  } catch (e) {
    console.error('Failed to report log', e);
  }
}

let csvFilePicker: HTMLInputElement | null = null;

function getCsvFilePicker(): HTMLInputElement {
  if (!csvFilePicker) {
    csvFilePicker = document.createElement('input');
    csvFilePicker.type = 'file';
    csvFilePicker.accept = '.csv';
    csvFilePicker.style.display = 'none';
    document.body.appendChild(csvFilePicker);
  }
  return csvFilePicker;
}

export async function pickCsvFile(): Promise<File | null> {
  if (isElectron) {
    const path = await window.electronAPI!.pickCsvPath();
    if (path) {
      const file = new File([], path.split(/[/\\]/).pop() || 'file.csv');
      (file as any)._path = path;
      return file;
    }
    return null;
  }
  return new Promise((resolve) => {
    const picker = getCsvFilePicker();
    picker.value = '';
    picker.onchange = () => {
      if (picker.files && picker.files[0]) {
        resolve(picker.files[0]);
      } else {
        resolve(null);
      }
    };
    picker.click();
  });
}

async function runUploadBrowser(csvFile: File, autoPublish: boolean): Promise<{ success: boolean; results?: unknown[]; error?: string }> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('csvFile', csvFile);
    formData.append('autoPublish', String(autoPublish));
    fetch(`${API_BASE}/api/upload`, { method: 'POST', body: formData })
      .then(res => res.json())
      .then(resolve)
      .catch(reject);
  });
}

export const api = {
  pickCsvFile,
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

runUpload: async (csvPath: string, autoPublish?: boolean, csvFile?: File) => {
    if (isElectron) {
      return window.electronAPI!.runUpload(csvPath, autoPublish);
    }
    if (csvFile) {
      return runUploadBrowser(csvFile, autoPublish ?? false);
    }
    return fetchJson<{ success: boolean; results?: unknown[]; error?: string }>('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ csvPath, autoPublish }),
    });
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
    if (isElectron) {
      return window.electronAPI!.pickCsvPath();
    }
    const file = await pickCsvFile();
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  },
};

export async function fetchFixtures() {
  try {
    const res = await fetch(`${API_BASE}/api/variants/fixtures`);
    return await res.json();
  } catch (error) {
    console.warn('Network error: Could not fetch fixtures');
    return { fixtures: [] };
  }
}

export async function runVariantFixture(fixture: string, config: any, dryRun: boolean) {
  try {
    const res = await fetch(`${API_BASE}/api/variants/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fixture, config, dryRun })
    });
    return await res.json();
  } catch (error) {
    throw new ApiRequestError('NETWORK_ERROR', 'سرور در دسترس نیست یا اتصال قطع شده است');
  }
}

export async function uploadCSVFixture(name: string, csvText: string) {
  try {
    const res = await fetch(`${API_BASE}/api/variants/fixtures/${name}/upload-csv`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/csv' },
      body: csvText
    });
    return await res.json();
  } catch (error) {
    throw new ApiRequestError('NETWORK_ERROR', 'سرور در دسترس نیست یا اتصال قطع شده است');
  }
}
