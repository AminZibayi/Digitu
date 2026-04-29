import fetch, { RequestInit, Response } from 'node-fetch';
import { logger } from './Logger';

export interface DigikalaClientOptions {
  baseUrl?: string;
  cookie: string;
  referer?: string;
  timeoutMs?: number;
  maxRetries?: number;
  retryDelayMs?: number;
}

export class DigikalaClient {
  private baseUrl: string;
  private cookie: string;
  private referer: string;
  private timeoutMs: number;
  private maxRetries: number;
  private retryDelayMs: number;

  constructor(options: DigikalaClientOptions) {
    this.baseUrl = (options.baseUrl || 'https://seller.digikala.com/api/v2').replace(/\/$/, '');
    this.cookie = options.cookie;
    this.referer = options.referer || 'https://seller.digikala.com/pwa/';
    this.timeoutMs = options.timeoutMs || 20000;
    this.maxRetries = options.maxRetries || 3;
    this.retryDelayMs = options.retryDelayMs || 600;
  }

  private buildHeaders(extra?: Record<string, string>): Record<string, string> {
    return {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.7',
      'content-type': 'application/json',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-mode': 'cors',
      'sec-fetch-dest': 'empty',
      'x-web-optimize-response': '1',
      cookie: this.cookie,
      Referer: this.referer,
      ...extra,
    };
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private isTooManyRequests(statusCode: number, bodyText: string): boolean {
    return statusCode === 429 || /too many requests/i.test(bodyText);
  }

  private sanitizeErrorBody(bodyText: string): string {
    return String(bodyText || '').slice(0, 600);
  }

  public async requestJson<T = any>(path: string, options: { method: string; body?: any; headers?: Record<string, string> }): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    let attempt = 0;

    while (true) {
      attempt += 1;
      let response: Response;
      let bodyText = '';

      try {
        const fetchOptions: RequestInit = {
          method: options.method,
          headers: this.buildHeaders(options.headers),
          timeout: this.timeoutMs,
        };

        if (options.body) {
           // Support FormData for image uploads, but default to JSON for everything else
           if (options.body.toString() === '[object FormData]') {
             fetchOptions.body = options.body;
             // Remove forced JSON content-type if it's FormData; form-data module handles multipart boundary
             const formHeaders = options.body.getHeaders?.() || {};
             fetchOptions.headers = this.buildHeaders({ ...options.headers, ...formHeaders });
             delete (fetchOptions.headers as Record<string, string>)['content-type'];
           } else {
             fetchOptions.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
           }
        }

        response = await fetch(url, fetchOptions);
        bodyText = await response.text();
      } catch (error: any) {
        if (attempt <= this.maxRetries) {
          logger.warn({ method: options.method, path, attempt, error: error.message }, 'API request network error, retrying');
          await this.sleep(this.retryDelayMs * attempt);
          continue;
        }
        throw new Error(`Network failed after retries for ${options.method} ${path}: ${error.message}`);
      }

      if (!response.ok) {
        if (attempt <= this.maxRetries && response.status >= 500 && !this.isTooManyRequests(response.status, bodyText)) {
          logger.warn({ method: options.method, path, status: response.status, attempt }, 'API request remote error 5xx, retrying');
          await this.sleep(this.retryDelayMs * attempt);
          continue;
        }

        throw new Error(`HTTP ${response.status} for ${options.method} ${path}: ${this.sanitizeErrorBody(bodyText)}`);
      }

      try {
        const json = JSON.parse(bodyText);
        // Digikala API specific wrapped error handling
        if (json.status !== 'ok' && json.status !== 200) {
            throw new Error(`Application Error [${path}]: ${JSON.stringify(json).slice(0, 400)}`);
        }
        return json;
      } catch (error: any) {
        // If it was our forced error from previous block, rethrow as is
        if (error.message.startsWith('Application Error')) throw error;
        
        logger.error({ method: options.method, path, error: error.message }, 'API response parse error');
        throw new Error(`Invalid JSON for ${options.method} ${path}: ${error.message}`);
      }
    }
  }
}
