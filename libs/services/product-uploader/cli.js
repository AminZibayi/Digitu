#!/usr/bin/env node

/**
 * ============================================================================
 * Digikala Product Uploader - Interactive CLI
 *
 * This tool helps you:
 * 1. Load a CSV file with product data
 * 2. Validate all data against Digikala API requirements
 * 3. Review and edit products interactively
 * 4. Upload products to Digikala Seller Platform
 *
 * Usage:
 *   node cli.js [--help|--validate|--upload|--dry-run]
 *   node cli.js --upload products.csv
 *   node cli.js --validate products.csv --fix
 *
 * ============================================================================
 */

"use strict";

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { parse } = require("csv-parse/sync");

// ─────────────────────────────────────────────────────────────────────────
// CONSTANTS & CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────

const CATEGORY_ID = 6946;
const BASE_API_URL = "https://seller.digikala.com/api/v2";

const PAINTING_TYPES = {
  تابلو: [4928],
  "تابلو نوری": [9657],
  "تابلو پازل": [9655],
};

const MEFA_IDS = {
  domestic: 893,
  imported: 894,
  893: 893,
  894: 894,
};

const CSV_COLUMNS = [
  "brand_id",
  "model",
  "painting_type",
  "is_iranian",
  "product_classes",
  "general_mefa_id",
  "title_fa",
  "title_en",
  "attr_subject_ids",
  "attr_technique_ids",
  "attr_description",
  "attr_piece_count",
  "advantages",
  "disadvantages",
  "width",
  "height",
  "length",
  "weight",
  "package_width",
  "package_height",
  "package_length",
  "package_weight",
  "image_paths",
];

const REQUIRED_FIELDS = ["brand_id", "model", "painting_type", "general_mefa_id", "title_fa", "image_paths"];

// ─────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

function log(msg, color = "reset") {
  console.log(colors[color] + msg + colors.reset);
}

function header(msg) {
  console.log("\n" + colors.bright + colors.blue + "═".repeat(70) + colors.reset);
  console.log(colors.bright + "  " + msg + colors.reset);
  console.log(colors.bright + colors.blue + "═".repeat(70) + colors.reset + "\n");
}

function section(msg) {
  console.log(colors.bright + colors.cyan + "─ " + msg + colors.reset);
}

function success(msg) {
  log("✓ " + msg, "green");
}

function error(msg) {
  log("✗ " + msg, "red");
}

function warning(msg) {
  log("⚠ " + msg, "yellow");
}

function info(msg) {
  log("ℹ " + msg, "dim");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─────────────────────────────────────────────────────────────────────────
// READLINE INTERFACE FOR INTERACTIVE INPUT
// ─────────────────────────────────────────────────────────────────────────

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => {
    rl.question(colors.bright + question + colors.reset + " ", (answer) => {
      resolve(answer.trim());
    });
  });
}

function closeReadline() {
  return new Promise((resolve) => {
    rl.close();
    setImmediate(resolve);
  });
}

// ─────────────────────────────────────────────────────────────────────────
// CSV PARSING & VALIDATION
// ─────────────────────────────────────────────────────────────────────────

function parseCSVFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records.map((r, i) => ({
    ...r,
    _row: i + 2,
    _errors: [],
    _warnings: [],
  }));
}

function parseIds(str) {
  if (!str || typeof str !== "string") return [];
  return str
    .split("|")
    .map((s) => parseInt(s.trim()))
    .filter((n) => !isNaN(n));
}

function parseStrings(str) {
  if (!str || typeof str !== "string") return [];
  return str
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function validateProduct(product) {
  const errors = [];
  const warnings = [];

  // Required fields
  if (!product.brand_id || isNaN(parseInt(product.brand_id))) {
    errors.push("brand_id must be a valid integer");
  }

  if (!product.model || !product.model.trim()) {
    errors.push("model is required");
  }

  if (!product.painting_type || !PAINTING_TYPES[product.painting_type]) {
    errors.push(`painting_type must be one of: ${Object.keys(PAINTING_TYPES).join(", ")}`);
  }

  const mefaId = product.general_mefa_id ? String(product.general_mefa_id).toLowerCase().trim() : "";
  if (!mefaId || !MEFA_IDS[mefaId]) {
    errors.push("general_mefa_id must be: domestic, imported, 893, or 894");
  }

  if (!product.title_fa || !product.title_fa.trim()) {
    errors.push("title_fa (Persian title) is required");
  } else if (product.title_fa.length < 5) {
    warnings.push("title_fa seems too short (recommend 50+ chars)");
  }

  // Image paths
  const imagePaths = parseStrings(product.image_paths);
  if (!imagePaths.length) {
    errors.push("At least one image_path is required");
  } else {
    imagePaths.forEach((imagePath) => {
      if (!fs.existsSync(imagePath)) {
        errors.push(`Image not found: ${imagePath}`);
      }
    });
  }

  // Warnings for optional fields
  if (!product.title_en || !product.title_en.trim()) {
    warnings.push("title_en (English title) is recommended");
  }

  if (!product.attr_subject_ids || !parseIds(product.attr_subject_ids).length) {
    warnings.push("attr_subject_ids (subject/theme) is recommended");
  }

  if (!product.attr_technique_ids || !parseIds(product.attr_technique_ids).length) {
    warnings.push("attr_technique_ids (technique) is recommended");
  }

  return { errors, warnings };
}

function validateAllProducts(products) {
  let totalErrors = 0;
  let totalWarnings = 0;

  products.forEach((product) => {
    const { errors, warnings } = validateProduct(product);
    product._errors = errors;
    product._warnings = warnings;
    totalErrors += errors.length;
    totalWarnings += warnings.length;
  });

  return { totalErrors, totalWarnings };
}

function displayValidationResults(products) {
  let hasErrors = false;
  const summaryErrors = [];
  const summaryWarnings = [];

  products.forEach((product, idx) => {
    const title = product.title_fa || product.model || `Row ${product._row}`;

    if (product._errors.length > 0) {
      hasErrors = true;
      section(`Row ${product._row}: ${title}`);
      error("ERRORS:");
      product._errors.forEach((err) => {
        console.log("  • " + colors.red + err + colors.reset);
        summaryErrors.push(`Row ${product._row}: ${err}`);
      });
    }

    if (product._warnings.length > 0) {
      section(`Row ${product._row}: ${title}`);
      warning("WARNINGS:");
      product._warnings.forEach((warn) => {
        console.log("  • " + colors.yellow + warn + colors.reset);
        summaryWarnings.push(`Row ${product._row}: ${warn}`);
      });
    }

    if (product._errors.length === 0 && product._warnings.length === 0) {
      console.log(colors.green + "✓ " + colors.reset + `Row ${product._row}: ${title}`);
    }
  });

  console.log();
  const { totalErrors, totalWarnings } = validateAllProducts(products);

  if (totalErrors > 0) {
    error(`${totalErrors} error(s) found. Fix before uploading.`);
  } else if (totalWarnings > 0) {
    warning(`${totalWarnings} warning(s) found. You may proceed, but review is recommended.`);
  } else {
    success(`All ${products.length} product(s) are valid!`);
  }

  return totalErrors === 0;
}

// ─────────────────────────────────────────────────────────────────────────
// INTERACTIVE PRODUCT REVIEW
// ─────────────────────────────────────────────────────────────────────────

async function reviewProduct(product, index, total) {
  const title = product.title_fa || product.model || `Product ${index + 1}`;
  console.log(`\n${colors.bright}[${index + 1}/${total}] ${title}${colors.reset}`);

  console.log(`  Model: ${product.model}`);
  console.log(`  Type: ${product.painting_type}`);
  console.log(`  Origin: ${product.general_mefa_id}`);
  console.log(`  Brand ID: ${product.brand_id}`);

  if (product.title_en) {
    console.log(`  EN Title: ${product.title_en}`);
  }

  const imagePaths = parseStrings(product.image_paths);
  console.log(`  Images: ${imagePaths.length} file(s)`);

  if (product._errors.length > 0) {
    error("ERRORS:");
    product._errors.forEach((err) => {
      console.log(`    • ${err}`);
    });
  }

  if (product._warnings.length > 0) {
    warning("WARNINGS:");
    product._warnings.forEach((warn) => {
      console.log(`    • ${warn}`);
    });
  }

  if (product._errors.length === 0) {
    success("Ready for upload");
  }

  const choice = await prompt("  [E]dit / [S]kip / [N]ext / [Q]uit?");

  switch (choice.toLowerCase()[0]) {
    case "e":
      return await editProduct(product);
    case "s":
      product._skip = true;
      return product;
    case "q":
      throw new Error("User quit");
    case "n":
    default:
      return product;
  }
}

async function editProduct(product) {
  console.log("\n" + colors.bright + "Editing product - edit each field or leave blank to keep" + colors.reset);

  const fields = [
    { key: "title_fa", label: "Persian Title", current: product.title_fa },
    { key: "title_en", label: "English Title", current: product.title_en },
    { key: "model", label: "Model", current: product.model },
    { key: "brand_id", label: "Brand ID", current: product.brand_id },
  ];

  for (const field of fields) {
    const answer = await prompt(`${field.label} [${field.current}]:`);
    if (answer) {
      product[field.key] = answer;
    }
  }

  // Re-validate after edits
  const { errors, warnings } = validateProduct(product);
  product._errors = errors;
  product._warnings = warnings;

  return product;
}

async function reviewAllProducts(products) {
  section("Interactive Product Review");
  info("You can edit, skip, or review each product before uploading");

  const reviewed = [];
  for (let i = 0; i < products.length; i++) {
    const product = await reviewProduct(products[i], i, products.length);
    reviewed.push(product);
  }

  return reviewed;
}

// ─────────────────────────────────────────────────────────────────────────
// DISPLAY HELP
// ─────────────────────────────────────────────────────────────────────────

function showHelp() {
  header("Digikala Product Uploader - Help");

  console.log(colors.bright + "USAGE:" + colors.reset);
  console.log("  node cli.js [command] [options]");

  console.log("\n" + colors.bright + "COMMANDS:" + colors.reset);
  console.log("  --help              Show this help message");
  console.log("  --validate FILE     Validate CSV file (no upload)");
  console.log("  --upload FILE       Interactive upload mode");
  console.log("  --dry-run FILE      Test upload without sending to API");
  console.log("  --auto FILE         Upload all products without review");
  console.log("  --check-token       Check API token status");

  console.log("\n" + colors.bright + "OPTIONS:" + colors.reset);
  console.log("  --fix               Auto-fix common validation errors");
  console.log("  --no-review         Skip interactive review");
  console.log("  --resume            Retry previously failed products");

  console.log("\n" + colors.bright + "EXAMPLES:" + colors.reset);
  console.log("  node cli.js --validate products.csv");
  console.log("  node cli.js --upload products.csv");
  console.log("  node cli.js --dry-run products.csv --no-review");

  console.log("\n" + colors.bright + "FILE FORMAT:" + colors.reset);
  console.log("  CSV file with UTF-8 encoding (with BOM for Persian text)");
  console.log("  First row must be column headers");
  console.log("  See CSV-SPEC.md for detailed column documentation");

  console.log("\n" + colors.bright + "CONFIGURATION:" + colors.reset);
  console.log("  API Token: Set DIGIKALA_TOKEN environment variable");
  console.log("  Or edit digikala-uploader.js CONFIG.cookie directly");
}

// ─────────────────────────────────────────────────────────────────────────
// MAIN PROGRAM
// ─────────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.length === 0) {
    showHelp();
    return;
  }

  // Parse command and file
  let command = "help";
  let csvFile = null;

  for (const arg of args) {
    if (arg.startsWith("--")) {
      command = arg.slice(2);
    } else if (!csvFile && !arg.startsWith("--")) {
      csvFile = arg;
    }
  }

  // Determine CSV file to use
  if (!csvFile) {
    csvFile = await prompt("Enter path to CSV file:");
  }

  if (!csvFile) {
    error("No CSV file specified");
    process.exit(1);
  }

  // Load and parse CSV
  header("Loading CSV File");
  try {
    log(`Loading: ${csvFile}`, "cyan");
    const products = parseCSVFile(csvFile);
    success(`Loaded ${products.length} product(s)`);

    // Validate all products
    header("Validation");
    const valid = displayValidationResults(products);

    if (command === "validate") {
      if (valid) {
        success("All products are valid! Ready for upload.");
      }
      return;
    }

    if (!valid && !args.includes("--auto")) {
      warning("Please fix errors before uploading");

      const continueAnyway = await prompt("Continue anyway? (may fail during upload) [yes/no]:");
      if (continueAnyway.toLowerCase() !== "yes") {
        log("Aborted", "yellow");
        await closeReadline();
        return;
      }
    }

    // Interactive review
    if (!args.includes("--no-review") && !args.includes("--auto")) {
      const reviewed = await reviewAllProducts(products);

      // Filter out skipped products
      const productsToUpload = reviewed.filter((p) => !p._skip);
      const skipped = reviewed.filter((p) => p._skip).length;

      if (skipped > 0) {
        info(`Skipped ${skipped} product(s)`);
      }

      header(`Ready to Upload: ${productsToUpload.length} Product(s)`);

      const confirmed = await prompt("Proceed with upload? [yes/no]:");

      if (confirmed.toLowerCase() !== "yes") {
        log("Upload cancelled", "yellow");
        await closeReadline();
        return;
      }
    } else {
      log("Skipping interactive review (--no-review or --auto)", "dim");
    }

    // Display summary
    header("Upload Summary");
    products.forEach((p) => {
      const title = p.title_fa || p.model || `Row ${p._row}`;
      if (!p._skip && p._errors.length === 0) {
        success(`Row ${p._row}: ${title}`);
      }
    });

    log(
      "\n" + colors.bright + "To complete the upload, use: node digikala-uploader.js " + csvFile + colors.reset,
      "cyan"
    );

    success("CSV validation and review complete!");
  } catch (err) {
    error(`Error: ${err.message}`);
    process.exit(1);
  } finally {
    await closeReadline();
  }
}

// Run
main().catch((err) => {
  error(`Fatal: ${err.message}`);
  process.exit(1);
});
