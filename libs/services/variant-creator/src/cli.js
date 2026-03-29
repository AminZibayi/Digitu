#!/usr/bin/env node
const path = require("path");
const dotenv = require("dotenv");
const { loadConfig, loadProducts } = require("./config");
const { runVariantCreation } = require("./runner");
const { createLogger } = require("./logger");

dotenv.config();

function parseArgs(argv) {
  const args = {
    dryRun: false,
    verbose: false,
    outputDir: "./output",
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--config") {
      args.config = argv[i + 1];
      i += 1;
    } else if (token === "--input") {
      args.input = argv[i + 1];
      i += 1;
    } else if (token === "--output-dir") {
      args.outputDir = argv[i + 1];
      i += 1;
    } else if (token === "--dry-run") {
      args.dryRun = true;
    } else if (token === "--verbose") {
      args.verbose = true;
    } else if (token === "--help" || token === "-h") {
      args.help = true;
    }
  }

  return args;
}

function printHelp() {
  console.log(
    `Digikala Variant Creator CLI\n\nUsage:\n  pnpm variant:create --config ./config.yaml --input ./fixtures/products.sample.json [--dry-run] [--output-dir ./output]\n\nOptions:\n  --config      Path to YAML config (required)\n  --input       Path to product list JSON file (required)\n  --dry-run     Compute and print payloads without API POST\n  --output-dir  Output directory for result files (default: ./output)\n  --verbose     Print debug logs\n`
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printHelp();
    return;
  }

  if (!args.config || !args.input) {
    printHelp();
    process.exitCode = 1;
    return;
  }

  // Create logger instance
  const logger = createLogger({
    logDir: path.resolve("./logs"),
    logFile: path.resolve("./logs/variant-creator.log"),
    level: args.verbose ? "debug" : "info",
    consoleOutput: true,
    fileOutput: true,
  });

  logger.info("Starting Digikala Variant Creator", {
    config: args.config,
    input: args.input,
    dryRun: args.dryRun,
    outputDir: args.outputDir,
  });

  let config;
  let products;
  try {
    logger.debug("Loading configuration from " + args.config);
    config = loadConfig(args.config);
    logger.info("Configuration loaded successfully");

    logger.debug("Loading products from " + args.input);
    products = loadProducts(args.input);
    logger.info("Products loaded successfully", { count: products.length });
  } catch (error) {
    logger.error("Configuration/Input error", { message: error.message });
    console.error(`Configuration/Input error: ${error.message}`);
    process.exitCode = 1;
    return;
  }

  logger.info("Running variant creation", {
    productCount: products.length,
    dryRun: args.dryRun,
  });

  const runResult = await runVariantCreation({
    config,
    products,
    dryRun: args.dryRun,
    outputDir: path.resolve(args.outputDir),
    verbose: args.verbose,
    logger,
  });

  const failed = runResult.results.filter((item) => !item.success).length;
  logger.info("Variant creation completed", {
    totalProducts: runResult.results.length,
    failedProducts: failed,
    resultsFile: runResult.resultFilePath,
  });

  if (!args.dryRun && failed > 0) {
    logger.warn("Some products failed variant creation", { count: failed });
    process.exitCode = 2;
  }

  logger.info("Log file saved to " + logger.getLogFile());
}

main().catch((error) => {
  const errorLogger = createLogger({
    level: "error",
    consoleOutput: true,
    fileOutput: true,
  });
  errorLogger.error("Fatal error", { message: error.message });
  console.error(`Fatal error: ${error.message}`);
  process.exitCode = 1;
});
