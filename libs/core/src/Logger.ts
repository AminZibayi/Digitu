import pino, { Logger as PinoLogger } from 'pino';
import pretty from 'pino-pretty';
import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';

export type LogLevelName = 'error' | 'warn' | 'info' | 'debug' | 'fatal' | 'trace';

export interface LogEntry {
  timestamp: string;
  level: LogLevelName;
  message: string;
  data?: Record<string, any>;
}

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFile = path.join(logDir, `digikala-auto-${new Date().toISOString().split('T')[0]}.log`);

const streams = [
  { stream: fs.createWriteStream(logFile, { flags: 'a' }), level: (process.env.LOG_LEVEL as any) || 'info' },
  { stream: pretty({ colorize: true }), level: (process.env.LOG_LEVEL as any) || 'info' },
];

const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: ['*.cookie', '*.authorization', '*.token', '*.password', 'req.headers.cookie', 'res.headers.set-cookie', 'headers.cookie', 'cookie'],
    censor: '[Redacted]',
  },
  serializers: {
    req: (req: any) => ({ method: req.method, url: req.url }),
    res: (res: any) => ({ statusCode: res.statusCode }),
    err: (err: any) => ({ message: err.message, stack: err.stack }),
  }
}, pino.multistream(streams));

const emitter = new EventEmitter();

function scrub(obj: any, depth = 0): any {
  if (depth > 3) return '[Max Depth reached]';
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    if (typeof obj === 'string' && obj.length > 500) return obj.slice(0, 500) + '... [truncated]';
    return obj;
  }
  
  // If it looks like a Node.js Request or Response object
  if (obj.socket || obj._readableState || obj._writableState || obj.client || obj.incoming) {
    return {
      method: obj.method,
      url: obj.url,
      statusCode: obj.statusCode
    };
  }

  const result: any = {};
  for (const key in obj) {
    // Aggressively skip any key that looks like a raw req/res if it wasn't caught by the top check
    if (['req', 'res', 'request', 'response', 'socket', '_readableState', '_writableState'].includes(key)) {
       const val = obj[key];
       if (val && typeof val === 'object') {
         result[key] = { method: val.method, url: val.url, statusCode: val.statusCode };
       } else {
         result[key] = val;
       }
    } else if (key === 'err' && obj[key] instanceof Error) {
      result[key] = { message: obj[key].message, stack: obj[key].stack };
    } else {
      const val = obj[key];
      if (val && typeof val === 'object') {
        result[key] = scrub(val, depth + 1);
      } else if (typeof val === 'string' && val.length > 500) {
        result[key] = val.slice(0, 500) + '... [truncated]';
      } else {
        result[key] = val;
      }
    }
  }
  return result;
}

function createWrappedLogger(pinoInstance: PinoLogger): any {
  const handler: ProxyHandler<PinoLogger> = {
    get(target, prop) {
      if (prop === 'on' || prop === 'once' || prop === 'off' || prop === 'removeListener' || prop === 'removeAllListeners') {
        const method = (emitter as any)[prop];
        return method.bind(emitter);
      }

      const value = (target as any)[prop];
      if (typeof value === 'function' && ['info', 'error', 'warn', 'debug', 'fatal', 'trace'].includes(prop as string)) {
        return (msgOrObj: any, maybeData?: any) => {
          let finalData = maybeData;
          let finalMsg = msgOrObj;

          if (typeof msgOrObj === 'string' && typeof maybeData === 'object' && maybeData !== null) {
            finalData = maybeData;
            finalMsg = msgOrObj;
          } else if (typeof msgOrObj === 'object' && msgOrObj !== null) {
            finalData = msgOrObj;
            finalMsg = maybeData;
          }

          const scrubbedData = scrub(finalData);
          value.call(target, scrubbedData, finalMsg);

          emitter.emit('log', {
            timestamp: new Date().toISOString(),
            level: (prop === 'warn' ? 'warn' : prop) as LogLevelName,
            message: finalMsg || (typeof finalData === 'string' ? finalData : ''),
            data: scrubbedData
          });
        };
      }

      if (prop === 'child') {
        return (bindings: any) => createWrappedLogger(target.child(scrub(bindings)));
      }

      return typeof value === 'function' ? value.bind(target) : value;
    }
  };

  return new Proxy(pinoInstance, handler);
}

export const logger: any = createWrappedLogger(baseLogger);

export function createLogger(component: string): any {
  return logger.child({ component });
}

if (typeof process !== 'undefined') {
  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
    logger.fatal({ err }, 'Uncaught Exception');
  });
  process.on('unhandledRejection', (reason) => {
    console.error('UNHANDLED REJECTION:', reason);
    logger.fatal({ reason }, 'Unhandled Rejection');
  });
}
