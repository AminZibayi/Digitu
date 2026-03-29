const fs = require("fs");
const path = require("path");
const { buildVariantDrafts } = require("./engine");
const { DigikalaVariantClient } = require("./client");

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJsonIfExists(filePath, fallbackValue) {
  if (!fs.existsSync(filePath)) {
    return fallbackValue;
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function variantFingerprint(productId, draft) {
  const warranty = draft.payload.warranty_id || "none";
  return `${productId}|${draft.themeValueId}|${draft.payload.price}|${warranty}|${draft.payload.site}`;
}

function normalizeExistingVariants(responsePayload) {
  const data = responsePayload && responsePayload.data ? responsePayload.data : {};
  const candidates = [];

  if (Array.isArray(data.variants)) {
    candidates.push(...data.variants);
  }
  if (Array.isArray(data.items)) {
    candidates.push(...data.items);
  }

  return candidates.map((item) => {
    const firstThemeValue =
      Array.isArray(item.theme_values) && item.theme_values.length > 0
        ? item.theme_values[0].theme_value_id || (item.theme_values[0].themeValue && item.theme_values[0].themeValue.id)
        : null;

    return {
      themeValueId: Number(firstThemeValue || item.size_id || 0),
      price: Number(item.price || 0),
      warranty_id: Number(item.warranty_id || 0),
      site: item.site || "digikala",
    };
  });
}

function createLogger(verbose) {
  return {
    info(message, meta) {
      console.log(JSON.stringify({ level: "info", message, ...(meta || {}) }));
    },
    warn(message, meta) {
      console.warn(JSON.stringify({ level: "warn", message, ...(meta || {}) }));
    },
    debug(message, meta) {
      if (verbose) {
        console.log(JSON.stringify({ level: "debug", message, ...(meta || {}) }));
      }
    },
  };
}

async function runVariantCreation({ config, products, dryRun, outputDir, verbose, logger: passedLogger }) {
  // Use passed logger if provided, otherwise create a fallback
  const logger = passedLogger || createLogger(Boolean(verbose));
  const absoluteOutputDir = path.resolve(outputDir || "./output");
  ensureDirectory(absoluteOutputDir);

  const stateFileName = (config.idempotency && config.idempotency.stateFile) || "idempotency-state.json";
  const stateFilePath = path.join(absoluteOutputDir, stateFileName);
  const idempotencyEnabled = config.idempotency ? config.idempotency.enabled !== false : true;
  const state = readJsonIfExists(stateFilePath, { created: {} });

  const client = new DigikalaVariantClient({
    baseUrl: config.api.baseUrl,
    cookie: config.api.cookie,
    referer: config.api.referer,
    timeoutMs: config.api.timeoutMs,
    maxRetries: config.api.maxRetries,
    retryDelayMs: config.api.retryDelayMs,
    logger,
  });

  const results = [];

  for (const product of products) {
    logger.info("Processing product", {
      productId: product.productId,
      title: product.productTitle,
    });

    const productResult = {
      productId: product.productId,
      productTitle: product.productTitle,
      success: true,
      variants: [],
      failures: [],
    };

    let existingFingerprints = new Set();
    if (!dryRun && idempotencyEnabled) {
      try {
        logger.debug("Fetching existing variants for product", {
          productId: product.productId,
        });
        const existing = await client.listVariants(product.productId);
        for (const item of normalizeExistingVariants(existing)) {
          const key = `${product.productId}|${item.themeValueId}|${item.price}|${item.warranty_id || "none"}|${item.site || "digikala"}`;
          existingFingerprints.add(key);
        }
        logger.debug("Existing variants loaded", {
          productId: product.productId,
          count: existingFingerprints.size,
        });
      } catch (error) {
        logger.warn("Failed to fetch existing variants", {
          productId: product.productId,
          reason: error.message,
        });
      }
    }

    for (const draft of buildVariantDrafts(config, product)) {
      const key = variantFingerprint(product.productId, draft);
      const alreadyCreated = Boolean(state.created[key]) || existingFingerprints.has(key);

      if (idempotencyEnabled && alreadyCreated) {
        logger.debug("Variant skipped (duplicate)", {
          productId: product.productId,
          size: draft.sizeKey,
          themeValueId: draft.themeValueId,
        });
        productResult.variants.push({
          sizeKey: draft.sizeKey,
          themeValueId: draft.themeValueId,
          price: draft.payload.price,
          status: "skipped_duplicate",
          matchedRuleIds: draft.matchedRuleIds,
        });
        continue;
      }

      if (dryRun) {
        logger.debug("Variant (dry-run)", {
          productId: product.productId,
          size: draft.sizeKey,
          price: draft.payload.price,
        });
        productResult.variants.push({
          sizeKey: draft.sizeKey,
          themeValueId: draft.themeValueId,
          price: draft.payload.price,
          status: "dry_run",
          payload: draft.payload,
          matchedRuleIds: draft.matchedRuleIds,
        });
        continue;
      }

      try {
        logger.debug("Creating variant", {
          productId: product.productId,
          size: draft.sizeKey,
          themeValueId: draft.themeValueId,
          price: draft.payload.price,
        });
        const created = await client.createVariant(product.productId, draft.payload);
        state.created[key] = {
          productId: product.productId,
          variantId: created.variantId,
          createdAt: new Date().toISOString(),
        };

        logger.info("Variant created successfully", {
          productId: product.productId,
          size: draft.sizeKey,
          variantId: created.variantId,
          price: draft.payload.price,
        });

        productResult.variants.push({
          sizeKey: draft.sizeKey,
          themeValueId: draft.themeValueId,
          price: draft.payload.price,
          variantId: created.variantId,
          status: "created",
          matchedRuleIds: draft.matchedRuleIds,
        });
      } catch (error) {
        productResult.success = false;
        logger.warn("Variant creation failed", {
          productId: product.productId,
          size: draft.sizeKey,
          reason: error.message,
        });
        productResult.failures.push({
          sizeKey: draft.sizeKey,
          reason: error.message,
        });
      }
    }

    results.push(productResult);
    logger.info("Product processing completed", {
      productId: product.productId,
      variantsCreated: productResult.variants.filter((v) => v.status === "created").length,
      variantsFailed: productResult.failures.length,
    });
  }

  if (!dryRun && idempotencyEnabled) {
    logger.debug("Saving idempotency state", { stateFile: stateFilePath });
    writeJson(stateFilePath, state);
  }

  const resultFilePath = path.join(absoluteOutputDir, `results-${Date.now()}.json`);
  logger.debug("Writing results file", { filePath: resultFilePath });
  writeJson(resultFilePath, {
    generatedAt: new Date().toISOString(),
    dryRun,
    summary: {
      totalProducts: results.length,
      failedProducts: results.filter((r) => !r.success).length,
    },
    results,
  });

  logger.info("Variant creation run finished", {
    dryRun,
    resultFilePath,
    totalProducts: results.length,
    failedProducts: results.filter((r) => !r.success).length,
  });

  return {
    dryRun,
    resultFilePath,
    results,
  };
}

module.exports = {
  runVariantCreation,
};
