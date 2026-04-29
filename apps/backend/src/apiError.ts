import { Request } from 'express';
import { logger } from '@digikala/core';

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  status: number;
}

export function toApiErrorPayload(
  error: unknown,
  req: Request,
  fallbackCode: string,
  fallbackMessage: string,
  fallbackStatus: number,
): ApiErrorPayload {
  const err = error instanceof Error ? error : new Error(String(error));
  
  logger.error({ 
    err, 
    req: { 
      method: req.method, 
      url: req.url, 
      body: req.body 
    } 
  }, 'API Error');

  if (error instanceof ApiError) {
    return {
      code: error.code,
      message: error.message,
      status: error.status,
    };
  }

  if (error instanceof Error) {
    return {
      code: fallbackCode,
      message: error.message || fallbackMessage,
      status: fallbackStatus,
    };
  }

  return {
    code: fallbackCode,
    message: fallbackMessage,
    status: fallbackStatus,
  };
}
