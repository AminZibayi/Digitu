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
    paths: ['*.cookie', '*.authorization', '*.token', '*.password', 'req.headers.cookie', 'res.headers.set-cookie'],
    censor: '[Redacted]',
  },
}, pino.multistream(streams));

const emitter = new EventEmitter();

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
            value.call(target, maybeData, msgOrObj);
            finalData = maybeData;
            finalMsg = msgOrObj;
          } else {
            value.call(target, msgOrObj, maybeData);
            if (typeof msgOrObj === 'object') {
              finalData = msgOrObj;
              finalMsg = maybeData;
            } else {
              finalData = maybeData;
              finalMsg = msgOrObj;
            }
          }

          emitter.emit('log', {
            timestamp: new Date().toISOString(),
            level: (prop === 'warn' ? 'warn' : prop) as LogLevelName,
            message: finalMsg,
            data: finalData
          });
        };
      }
      
      if (prop === 'child') {
        return (bindings: any) => createWrappedLogger(target.child(bindings));
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
    logger.fatal({ err }, 'Uncaught Exception');
    process.exit(1);
  });
  process.on('unhandledRejection', (reason) => {
    logger.fatal({ reason }, 'Unhandled Rejection');
    process.exit(1);
  });
}
