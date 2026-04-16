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
  fallbackCode: string,
  fallbackMessage: string,
  fallbackStatus: number,
): ApiErrorPayload {
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
