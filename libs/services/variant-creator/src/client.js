const fetch = require("node-fetch");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRetry(statusCode) {
  return statusCode === 429 || statusCode >= 500;
}

function sanitizeErrorBody(bodyText) {
  return String(bodyText || "").slice(0, 600);
}

class DigikalaVariantClient {
  constructor(options) {
    this.baseUrl = (options.baseUrl || "https://seller.digikala.com/api/v2").replace(/\/$/, "");
    this.cookie = options.cookie;
    this.referer = options.referer;
    this.timeoutMs = options.timeoutMs || 20000;
    this.maxRetries = options.maxRetries || 3;
    this.retryDelayMs = options.retryDelayMs || 600;
    this.logger = options.logger || null;
  }

  buildHeaders(extra) {
    return {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.7",
      "content-type": "application/json",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      "x-web-optimize-response": "1",
      cookie: this.cookie,
      Referer: this.referer,
      ...extra,
    };
  }

  async requestJson(path, options) {
    const url = `${this.baseUrl}${path}`;
    let attempt = 0;

    this.logger &&
      this.logger.debug("API request starting", {
        method: options.method,
        path,
        attempt: 1,
      });

    while (true) {
      attempt += 1;
      let response;
      let bodyText = "";

      try {
        response = await fetch(url, {
          method: options.method,
          headers: this.buildHeaders(options.headers || {}),
          body: options.body ? JSON.stringify(options.body) : undefined,
          timeout: this.timeoutMs,
        });

        bodyText = await response.text();
      } catch (error) {
        if (attempt <= this.maxRetries) {
          this.logger &&
            this.logger.debug("API request retrying after error", {
              method: options.method,
              path,
              attempt,
              error: error.message,
            });
          await sleep(this.retryDelayMs * attempt);
          continue;
        }
        this.logger &&
          this.logger.error("API request failed", {
            method: options.method,
            path,
            error: error.message,
          });
        throw new Error(`Request failed after retries for ${options.method} ${path}: ${error.message}`);
      }

      if (!response.ok) {
        if (attempt <= this.maxRetries && shouldRetry(response.status)) {
          this.logger &&
            this.logger.debug("API request retrying after HTTP error", {
              method: options.method,
              path,
              status: response.status,
              attempt,
            });
          await sleep(this.retryDelayMs * attempt);
          continue;
        }

        this.logger &&
          this.logger.error("API request failed with HTTP error", {
            method: options.method,
            path,
            status: response.status,
          });
        throw new Error(`HTTP ${response.status} for ${options.method} ${path}: ${sanitizeErrorBody(bodyText)}`);
      }

      try {
        this.logger &&
          this.logger.debug("API request succeeded", {
            method: options.method,
            path,
            status: response.status,
          });
        return JSON.parse(bodyText);
      } catch (error) {
        this.logger &&
          this.logger.error("API response parse error", {
            method: options.method,
            path,
            error: error.message,
          });
        throw new Error(`Invalid JSON for ${options.method} ${path}: ${error.message}`);
      }
    }
  }

  async listVariants(productId) {
    return this.requestJson(`/variant-creation/${productId}`, { method: "GET" });
  }

  async createVariant(productId, variantPayload) {
    const payload = await this.requestJson(`/variant-creation/v2/${productId}`, {
      method: "POST",
      body: variantPayload,
    });

    const variantId = payload && payload.data && payload.data.data ? payload.data.data.id : null;
    if (!variantId) {
      throw new Error(`Variant creation succeeded but response did not include data.data.id for product ${productId}`);
    }

    return {
      variantId,
      raw: payload,
    };
  }
}

module.exports = {
  DigikalaVariantClient,
};
