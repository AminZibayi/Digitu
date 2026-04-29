import { EventEmitter } from 'events';

export const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

export type LogLevelName = keyof typeof LOG_LEVELS;

export interface LogEntry {
  timestamp: string;
  level: LogLevelName;
  message: string;
  data?: Record<string, any>;
}

export class Logger extends EventEmitter {
  private level: number;

  constructor(options: { level?: LogLevelName } = {}) {
    super();
    this.level = LOG_LEVELS[options.level || 'info'];
  }

  getTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  private emitLog(levelName: LogLevelName, message: string, data?: Record<string, any>) {
    const levelNum = LOG_LEVELS[levelName] ?? LOG_LEVELS.info;
    if (levelNum > this.level) {
      return;
    }

    const entry: LogEntry = {
      timestamp: this.getTimestamp(),
      level: levelName,
      message,
      data
    };

    // Emit event which Electron ipcMain will intercept
    this.emit('log', entry);

    // Also console log in development/backend
    const consoleMethod = levelName === 'error' ? 'error' : levelName === 'warn' ? 'warn' : 'log';
    
    // Formatting JSON for backend console
    const formatted = `[${entry.timestamp}] [${entry.level.toUpperCase().padEnd(5)}] ${entry.message} ${entry.data ? JSON.stringify(entry.data) : ''}`;
    console[consoleMethod](formatted);
  }

  error(message: string, data?: Record<string, any>) {
    this.emitLog('error', message, data);
  }

  warn(message: string, data?: Record<string, any>) {
    this.emitLog('warn', message, data);
  }

  info(message: string, data?: Record<string, any>) {
    this.emitLog('info', message, data);
  }

  debug(message: string, data?: Record<string, any>) {
    this.emitLog('debug', message, data);
  }
}

// Global logger instance for shared package reuse
export const logger = new Logger();
