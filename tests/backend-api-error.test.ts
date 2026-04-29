import { describe, expect, it } from 'vitest';
import { ApiError, toApiErrorPayload } from '../apps/backend/src/apiError';

describe('api error helper', () => {
  it('preserves code, message, and status from ApiError', () => {
    const error = new ApiError('INVALID_REQUEST', 'csvPath is required', 400);

    expect(toApiErrorPayload(error, null, 'INTERNAL_ERROR', 'Internal server error', 500)).toEqual({
      code: 'INVALID_REQUEST',
      message: 'csvPath is required',
      status: 400,
    });
  });

  it('uses fallback code while keeping Error message', () => {
    const error = new Error('Upload failed');

    expect(toApiErrorPayload(error, null, 'UPLOAD_FAILED', 'Upload failed', 500)).toEqual({
      code: 'UPLOAD_FAILED',
      message: 'Upload failed',
      status: 500,
    });
  });
});
