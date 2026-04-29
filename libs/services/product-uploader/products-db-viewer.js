#!/usr/bin/env node

/**
 * ============================================================================
 * Products Database Viewer
 *
 * View the persistent record of all uploaded products with their IDs and titles
 *
 * Usage:
 *   node products-db-viewer.js [options]
 *   node products-db-viewer.js --list
 *   node products-db-viewer.js --search "title or model"
 *   node products-db-viewer.js --json
 *   node products-db-viewer.js --count
 *
 * ============================================================================
 */

"use strict";

const uploader = require("./digikala-uploader");

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

async function main() {
  const args = process.argv.slice(2);

  const products = uploader.getAllProductsFromDB();

  if (args.includes("--count")) {
    console.log(colors.bright + `Total products in database: ${products.length}` + colors.reset);
    return;
  }

  if (args.includes("--json")) {
    console.log(JSON.stringify(products, null, 2));
    return;
  }

  const searchTerm = args.find((a, i) => args[i - 1] === "--search");
  if (searchTerm) {
    const filtered = products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.model && p.model.toLowerCase().includes(searchTerm.toLowerCase())) ||
        p.productId.toString().includes(searchTerm)
    );

    if (filtered.length === 0) {
      log(`No products found matching: "${searchTerm}"`, "yellow");
      return;
    }

    header(`Search Results: "${searchTerm}" (${filtered.length} found)`);
    displayProducts(filtered);
    return;
  }

  // Default: list all products
  header(`Products Database (${products.length} total)`);

  if (products.length === 0) {
    log("No products uploaded yet. Database is empty.", "dim");
    return;
  }

  displayProducts(products);

  // Summary stats
  console.log("\n" + colors.dim + "─".repeat(70) + colors.reset);
  console.log(colors.bright + "Summary:" + colors.reset);
  const uniqueDates = new Set(products.map((p) => p.timestamp.split("T")[0]));
  console.log(`  Total products: ${colors.bright}${products.length}${colors.reset}`);
  console.log(`  Days uploaded: ${colors.bright}${uniqueDates.size}${colors.reset}`);
  console.log(`  Latest: ${colors.bright}${products[products.length - 1].timestamp}${colors.reset}`);
}

function displayProducts(products) {
  products.forEach((p, idx) => {
    const date = new Date(p.timestamp).toLocaleString("fa-IR");
    const source = p.sourceFile ? ` (from ${p.sourceFile})` : "";
    const modelInfo = p.model ? ` [${p.model}]` : "";

    console.log(`${colors.bright}${idx + 1}. ${p.title}${modelInfo}${colors.reset}`);
    console.log(`   ${colors.cyan}ID:${colors.reset} ${colors.bright}${p.productId}${colors.reset}`);
    console.log(`   ${colors.dim}${date}${source}${colors.reset}`);
    console.log();
  });
}

if (require.main === module) {
  main().catch((err) => {
    log(`Error: ${err.message}`, "red");
    process.exit(1);
  });
}
