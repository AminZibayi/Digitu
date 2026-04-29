#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");

const DB_FILE = path.resolve(process.cwd(), "products-db.json");
const OUT_FILE = path.resolve(process.cwd(), "products-export.json");

function main() {
  if (!fs.existsSync(DB_FILE)) {
    throw new Error("products-db.json not found");
  }

  const raw = fs.readFileSync(DB_FILE, "utf-8");
  const db = JSON.parse(raw);
  const products = Array.isArray(db.products) ? db.products : [];

  const output = products.map((p) => ({
    productId: Number(p.productId),
    productTitle: p.title || "",
  }));

  fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), "utf-8");
  console.log(`Exported ${output.length} product(s) to products-export.json`);
}

if (require.main === module) {
  try {
    main();
  } catch (err) {
    console.error(`Export failed: ${err.message}`);
    process.exit(1);
  }
}
