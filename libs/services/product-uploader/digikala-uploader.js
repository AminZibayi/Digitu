// ============================================================
// digikala-uploader.js
// Bulk product uploader for Digikala Seller Platform
// Category: تابلو (6946)
//
// Usage:   node digikala-uploader.js products.csv
// Requires: npm install csv-parse form-data node-fetch@2
// ============================================================

"use strict";

const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const FormData = require("form-data");
const fetch = require("node-fetch");
require("dotenv").config({ path: ".env", quiet: true });

// ────────────────────────────────────────────────────────────
// CONFIGURATION — update your session cookies here
// ────────────────────────────────────────────────────────────
const CONFIG = {
  baseUrl: "https://seller.digikala.com/api/v2",

  // Copy the full cookie string from your browser DevTools.
  // The seller_api_access_token JWT expires — refresh as needed.
  cookie:
    process.env.DIGIKALA_COOKIE ||
    [
      "PHPSESSID=YOUR_PHPSESSID",
      "tracker_session=YOUR_TRACKER_SESSION",
      "seller_api_access_token=YOUR_JWT_ACCESS_TOKEN",
      "seller_api_otp_token=YOUR_OTP_TOKEN",
    ].join("; "),

  // Milliseconds between each product (avoid rate limiting)
  delayBetweenProducts: 2000,
  // Milliseconds between each step within a product
  delayBetweenSteps: 600,
};

// ────────────────────────────────────────────────────────────
// PERSISTENT PRODUCTS DATABASE
// ────────────────────────────────────────────────────────────
const PRODUCTS_DB_FILE = "products-db.json";

function loadProductsDB() {
  try {
    if (fs.existsSync(PRODUCTS_DB_FILE)) {
      const content = fs.readFileSync(PRODUCTS_DB_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn(`⚠ Could not load products database: ${err.message}`);
  }
  return {
    version: "1.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: [],
  };
}

function saveProductsDB(db) {
  try {
    db.updatedAt = new Date().toISOString();
    fs.writeFileSync(PRODUCTS_DB_FILE, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.warn(`⚠ Could not save products database: ${err.message}`);
  }
}

function addProductToDB(productId, title, model = null, sourceFile = null) {
  const db = loadProductsDB();
  const record = {
    timestamp: new Date().toISOString(),
    productId,
    title,
    model: model || null,
    sourceFile: sourceFile || null,
  };
  db.products.push(record);
  saveProductsDB(db);
  return record;
}

function isProductInDB(productId) {
  const db = loadProductsDB();
  return db.products.some((p) => p.productId === productId);
}

function getProductFromDB(productId) {
  const db = loadProductsDB();
  return db.products.find((p) => p.productId === productId);
}

function getAllProductsFromDB() {
  const db = loadProductsDB();
  return db.products;
}

// ────────────────────────────────────────────────────────────
// CATEGORY 6946 CONSTANTS (تابلو)
// ────────────────────────────────────────────────────────────
const CATEGORY_ID = 6946;

// Division IDs
const DIVISIONS = {
  تابلو: 4928,
  "تابلو نوری": 9657,
  "تابلو پازل": 9655,
};

// Observed product type options
const PRODUCT_TYPES = {
  ساده: 24054,
};

// general_mefa_id options
const MEFA_IDS = {
  domestic: 893, // تولید داخل
  imported: 894, // وارداتی
};

// Known attribute IDs for category 6946
// (scraped from the live form save payload)
const ATTR = {
  USAGE_TYPE: "4931",
  PIECE_COUNT_SELECT: "5127",
  VISUAL_FEATURE: "5218",
  DESIGN: "6597",
  FRAME_TYPE: "8482",
  FRAME_MATERIAL: "10043",
  FRAME_COLOR: "10129",
  SURFACE_GUARD: "10132",
  EXTRA_DESCRIPTION: "119",
  RESISTANCE: "5065",
  WASHING_METHOD: "5080",
  GENERAL_DESIGN: "7830",
  FRAME_THICKNESS_MM: "10130",
  PRINT_TYPE: "10131",
};

// ────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseBoolean(value, defaultValue = false) {
  if (typeof value === "boolean") return value;
  if (value === undefined || value === null || value === "") return defaultValue;
  const s = String(value).trim().toLowerCase();
  if (["true", "1", "yes", "y"].includes(s)) return true;
  if (["false", "0", "no", "n"].includes(s)) return false;
  return defaultValue;
}

function parseIds(value) {
  return (value || "")
    .split("|")
    .map((x) => parseInt(String(x).trim()))
    .filter((n) => !isNaN(n));
}

function parseStrings(value) {
  return (value || "")
    .split("|")
    .map((x) => String(x).trim())
    .filter(Boolean);
}

function addArrayAttr(target, attrId, values) {
  if (Array.isArray(values) && values.length) target[attrId] = values;
}

function addStringAttr(target, attrId, value) {
  const s = value === undefined || value === null ? "" : String(value).trim();
  if (s) target[attrId] = s;
}

function attrsToIdValueArray(attrMap) {
  return Object.entries(attrMap).map(([id, value]) => ({ id: Number(id), value }));
}

function baseHeaders(extra = {}) {
  return {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.7",
    "captcha-token": "",
    priority: "u=1, i",
    "x-web-optimize-response": "1",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    referer: "https://seller.digikala.com/pwa/product/create/1",
    cookie: CONFIG.cookie,
    ...extra,
  };
}

async function apiCall(method, endpoint, body = null) {
  const url = `${CONFIG.baseUrl}${endpoint}`;
  const headers = baseHeaders(body ? { "content-type": "application/json" } : {});
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);
  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response from ${endpoint}: ${text.slice(0, 200)}`);
  }

  if (json.status !== "ok") {
    throw new Error(`API error [${endpoint}]: ${JSON.stringify(json).slice(0, 400)}`);
  }
  return json.data;
}

// ────────────────────────────────────────────────────────────
// STEP 1 — Create draft + save basic info
// Returns: draftProductId (number)
// ────────────────────────────────────────────────────────────
async function saveBasicInfo(p) {
  const data = await apiCall("POST", "/product-creation/product/detail/validation", {
    category_id: CATEGORY_ID,
    division_id: p.division_id,
    brand_id: p.brand_id,
    model: p.model,
    product_type_ids: p.product_type_ids,
    is_iranian: p.is_iranian,
    product_classes: p.product_classes,
    fake_reasons: [],
    general_mefa_id: p.general_mefa_id,
    exclusive_mefa_id: null,
    fake: false,
    package_width: p.package_width || 0,
    package_height: p.package_height || 0,
    package_length: p.package_length || 0,
    package_weight: p.package_weight || 0,
    advantages: p.advantages,
    disadvantages: p.disadvantages,
    only_cf_fields: {
      status: "marketable",
      platforms: ["digikala"],
      other_titles: [],
    },
  });

  if (data?.is_valid === false) {
    throw new Error(`Basic info validation failed: ${JSON.stringify(data?.errors || data)}`);
  }

  const draftId = data?.draft_product_id ?? data?.bind?.draft_product_id ?? data?.id;

  if (!draftId) {
    throw new Error(`No draft_product_id in response: ${JSON.stringify(data)}`);
  }
  return draftId;
}

// ────────────────────────────────────────────────────────────
// STEP 2 — Save attributes, dimensions, pros/cons
// ────────────────────────────────────────────────────────────
async function saveAttributes(draftId, p) {
  // Build the nested attributes object for category 6946
  const attrPayload = {};
  addArrayAttr(attrPayload, ATTR.USAGE_TYPE, p.attr_usage_type_ids);
  addArrayAttr(attrPayload, ATTR.PIECE_COUNT_SELECT, p.attr_piece_count_select_ids);
  addArrayAttr(attrPayload, ATTR.VISUAL_FEATURE, p.attr_visual_feature_ids);
  addStringAttr(attrPayload, ATTR.DESIGN, p.attr_design);
  addArrayAttr(attrPayload, ATTR.FRAME_TYPE, p.attr_frame_type_ids);
  addArrayAttr(attrPayload, ATTR.FRAME_MATERIAL, p.attr_frame_material_ids);
  addStringAttr(attrPayload, ATTR.FRAME_COLOR, p.attr_frame_color);
  addArrayAttr(attrPayload, ATTR.SURFACE_GUARD, p.attr_surface_guard_ids);
  addStringAttr(attrPayload, ATTR.EXTRA_DESCRIPTION, p.attr_extra_description);
  addArrayAttr(attrPayload, ATTR.RESISTANCE, p.attr_resistance_ids);
  addArrayAttr(attrPayload, ATTR.WASHING_METHOD, p.attr_washing_method_ids);
  addArrayAttr(attrPayload, ATTR.GENERAL_DESIGN, p.attr_general_design_ids);
  addStringAttr(attrPayload, ATTR.FRAME_THICKNESS_MM, p.attr_frame_thickness_mm);
  addArrayAttr(attrPayload, ATTR.PRINT_TYPE, p.attr_print_type_ids);

  // Legacy aliases
  addArrayAttr(attrPayload, ATTR.USAGE_TYPE, p.attr_subject_ids);
  addArrayAttr(attrPayload, ATTR.PIECE_COUNT_SELECT, p.attr_technique_ids);
  if (!attrPayload[ATTR.EXTRA_DESCRIPTION]) addStringAttr(attrPayload, ATTR.EXTRA_DESCRIPTION, p.attr_description);
  if (!attrPayload[ATTR.FRAME_THICKNESS_MM]) addStringAttr(attrPayload, ATTR.FRAME_THICKNESS_MM, p.attr_piece_count);

  await apiCall("POST", "/product-creation/attributes", {
    draft_product_id: draftId,
    category_id: CATEGORY_ID,
    attributes: attrsToIdValueArray(attrPayload),
    width: p.width || null,
    height: p.height || null,
    length: p.length || null,
    weight: p.weight || null,
  });
}

// ────────────────────────────────────────────────────────────
// STEP 3 — Save title
// ────────────────────────────────────────────────────────────
async function saveTitle(draftId, p) {
  await apiCall("POST", "/product-creation/auto-title/save", {
    draft_product_id: draftId,
    title_fa: p.title_fa,
    title_en: p.title_en || "",
  });
}

// ────────────────────────────────────────────────────────────
// STEP 4 — Upload images (multipart)
// Returns: array of encrypted_id strings
// ────────────────────────────────────────────────────────────
async function uploadImage(imagePath, slot) {
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image not found: ${imagePath}`);
  }
  const form = new FormData();
  form.append("file", fs.createReadStream(imagePath), path.basename(imagePath));
  form.append("slot", String(slot));

  const res = await fetch(`${CONFIG.baseUrl}/product-creation/images/upload`, {
    method: "POST",
    headers: { ...baseHeaders(), ...form.getHeaders() },
    body: form,
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Image upload bad JSON: ${text.slice(0, 200)}`);
  }

  if (json.status !== "ok") {
    throw new Error(`Image upload failed (slot ${slot}): ${JSON.stringify(json).slice(0, 300)}`);
  }
  // encrypted_id is at data.data.id
  const encId = json.data?.data?.id ?? json.data?.id;
  if (!encId) throw new Error(`No encrypted_id in image response: ${JSON.stringify(json.data)}`);
  return encId;
}

// ────────────────────────────────────────────────────────────
// STEP 5 — Finalize with photos → publishes the product
// Returns: Digikala product_id
// ────────────────────────────────────────────────────────────
async function finalizeProduct(draftId, encryptedIds) {
  const [main, ...rest] = encryptedIds;
  const data = await apiCall("POST", "/product-creation/save", {
    category_id: CATEGORY_ID,
    draft_product_id: draftId,
    only_b2b: false,
    photos_detail: {
      main_image: main,
      order: encryptedIds.join(","),
      images: [{ encrypted_id: main, active: true }, ...rest.map((id) => ({ encrypted_id: id }))],
    },
  });
  return data?.data?.product_id ?? data?.product_id ?? null;
}

// ────────────────────────────────────────────────────────────
// PROCESS ONE PRODUCT ROW
// ────────────────────────────────────────────────────────────
async function processProduct(p, index) {
  const label = p.title_fa || p.model || `Row ${index + 1}`;
  console.log(`\n▶ [${index + 1}] ${label}`);

  try {
    // Step 1 — basic info → creates draft
    process.stdout.write("  [1/5] Basic info ... ");
    const draftId = await saveBasicInfo(p);
    console.log(`✓ draft_id=${draftId}`);
    await sleep(CONFIG.delayBetweenSteps);

    // Step 2 — attributes
    process.stdout.write("  [2/5] Attributes  ... ");
    await saveAttributes(draftId, p);
    console.log("✓");
    await sleep(CONFIG.delayBetweenSteps);

    // Step 3 — title
    process.stdout.write("  [3/5] Title       ... ");
    await saveTitle(draftId, p);
    console.log("✓");
    await sleep(CONFIG.delayBetweenSteps);

    // Step 4 — images
    const encryptedIds = [];
    for (let i = 0; i < p.image_paths.length; i++) {
      process.stdout.write(`  [4/5] Image ${i + 1}/${p.image_paths.length}   ... `);
      const encId = await uploadImage(p.image_paths[i], i + 1);
      encryptedIds.push(encId);
      console.log(`✓ (${encId})`);
      await sleep(300);
    }

    // Step 5 — finalize
    process.stdout.write("  [5/5] Finalize    ... ");
    const productId = await finalizeProduct(draftId, encryptedIds);
    console.log(`✓  →  product_id=${productId}`);

    return { status: "success", title: label, model: p.model, draftId, productId };
  } catch (err) {
    console.log(`\n  ❌ FAILED: ${err.message}`);
    return { status: "failed", title: label, error: err.message };
  }
}

function hasValidCookie() {
  return !!CONFIG.cookie && !CONFIG.cookie.includes("YOUR_JWT_ACCESS_TOKEN");
}

// ────────────────────────────────────────────────────────────
// CSV PARSER
// Expected columns (see products.csv template):
//   brand_id, model, painting_type, is_iranian, product_classes,
//   general_mefa_id, title_fa, title_en,
//   attr_subject_ids, attr_technique_ids, attr_description, attr_piece_count,
//   advantages, disadvantages,
//   width, height, length, weight,
//   package_width, package_height, package_length, package_weight,
//   image_paths
// ────────────────────────────────────────────────────────────
function parseCSV(filePath) {
  const raw = fs.readFileSync(filePath, { encoding: "utf-8" });
  // Strip BOM if present (common with Excel-saved UTF-8)
  const clean = raw.replace(/^\uFEFF/, "");
  const records = parse(clean, { columns: true, skip_empty_lines: true, trim: true });

  return records.map((r, i) => {
    const divisionLabel = (r.division_label || r.painting_type || "").trim();
    const division_id = parseInt(r.division_id) || DIVISIONS[divisionLabel] || DIVISIONS["تابلو"];

    const parsedProductTypeIds = parseIds(r.product_type_ids);
    const fallbackProductType =
      parseInt(r.product_type_id) || PRODUCT_TYPES[(r.product_type_label || "").trim()] || PRODUCT_TYPES["ساده"];
    const product_type_ids = parsedProductTypeIds.length ? parsedProductTypeIds : [fallbackProductType];

    // Resolve general_mefa_id
    const mefaRaw = r.general_mefa_id?.trim().toLowerCase();
    const general_mefa_id = MEFA_IDS[mefaRaw] || parseInt(r.general_mefa_id) || MEFA_IDS.domestic;

    return {
      // Basic info
      brand_id: parseInt(r.brand_id),
      model: r.model,
      division_id,
      product_type_ids,
      is_iranian: parseBoolean(r.is_iranian, true),
      product_classes: parseStrings(r.product_classes),
      general_mefa_id,

      // Titles
      title_fa: r.title_fa,
      title_en: r.title_en || "",

      // Canonical attributes
      attr_usage_type_ids: parseIds(r.attr_usage_type_ids),
      attr_piece_count_select_ids: parseIds(r.attr_piece_count_select_ids),
      attr_visual_feature_ids: parseIds(r.attr_visual_feature_ids),
      attr_design: r.attr_design || "",
      attr_frame_type_ids: parseIds(r.attr_frame_type_ids),
      attr_frame_material_ids: parseIds(r.attr_frame_material_ids),
      attr_frame_color: r.attr_frame_color || "",
      attr_surface_guard_ids: parseIds(r.attr_surface_guard_ids),
      attr_extra_description: r.attr_extra_description || "",
      attr_resistance_ids: parseIds(r.attr_resistance_ids),
      attr_washing_method_ids: parseIds(r.attr_washing_method_ids),
      attr_general_design_ids: parseIds(r.attr_general_design_ids),
      attr_frame_thickness_mm: r.attr_frame_thickness_mm || "",
      attr_print_type_ids: parseIds(r.attr_print_type_ids),

      // Legacy attributes
      attr_subject_ids: parseIds(r.attr_subject_ids),
      attr_technique_ids: parseIds(r.attr_technique_ids),
      attr_description: r.attr_description || "",
      attr_piece_count: r.attr_piece_count || "",

      // Pros / cons
      advantages: parseStrings(r.advantages),
      disadvantages: parseStrings(r.disadvantages),

      // Product dimensions (mm / grams)
      width: parseFloat(r.width) || 0,
      height: parseFloat(r.height) || 0,
      length: parseFloat(r.length) || 0,
      weight: parseFloat(r.weight) || 0,

      // Package dimensions (mm / grams) — can be null
      package_width: r.package_width ? parseFloat(r.package_width) : null,
      package_height: r.package_height ? parseFloat(r.package_height) : null,
      package_length: r.package_length ? parseFloat(r.package_length) : null,
      package_weight: r.package_weight ? parseFloat(r.package_weight) : null,

      // Images: pipe-separated local file paths
      image_paths: parseStrings(r.image_paths),

      _row: i + 2, // for error reporting (1-indexed + header)
    };
  });
}

// ────────────────────────────────────────────────────────────
// MAIN
// ────────────────────────────────────────────────────────────
async function main() {
  const csvFile = process.argv[2];
  if (!csvFile) {
    console.error("Usage: node digikala-uploader.js products.csv");
    process.exit(1);
  }
  if (!fs.existsSync(csvFile)) {
    console.error(`File not found: ${csvFile}`);
    process.exit(1);
  }

  const products = parseCSV(csvFile);
  await runUpload(products, { sourceLabel: csvFile });
}

async function runUpload(products, options = {}) {
  const { sourceLabel = "(in-memory)", outFile = "upload_results.json" } = options;

  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("No products to upload");
  }

  if (!hasValidCookie()) {
    throw new Error("Missing valid cookie. Set DIGIKALA_COOKIE env var or update .env");
  }

  console.log("=".repeat(52));
  console.log("  Digikala Bulk Product Uploader — تابلو (6946)");
  console.log("=".repeat(52));
  console.log(`Source: ${sourceLabel}\n`);
  console.log(`Found ${products.length} product(s) to upload.\n`);

  const results = [];
  for (let i = 0; i < products.length; i++) {
    const result = await processProduct(products[i], i);
    results.push(result);
    if (i < products.length - 1) await sleep(CONFIG.delayBetweenProducts);
  }

  // ── Summary ──────────────────────────────────────────────
  const ok = results.filter((r) => r.status === "success");
  const fail = results.filter((r) => r.status === "failed");

  console.log("\n" + "=".repeat(52));
  console.log(`  ✅ Succeeded: ${ok.length}   ❌ Failed: ${fail.length}`);
  console.log("=".repeat(52));

  if (ok.length) {
    console.log("\nSuccessful uploads:");
    ok.forEach((r) => {
      console.log(`  ✓ "${r.title}" → product_id: ${r.productId}`);
      // Save to persistent database
      addProductToDB(r.productId, r.title, r.model, sourceLabel);
    });
  }
  if (fail.length) {
    console.log("\nFailed products:");
    fail.forEach((r) => console.log(`  ✗ "${r.title}": ${r.error}`));
  }

  fs.writeFileSync(outFile, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\nFull log saved → ${outFile}`);
  return results;
}

module.exports = {
  parseCSV,
  runUpload,
  processProduct,
  loadProductsDB,
  saveProductsDB,
  addProductToDB,
  isProductInDB,
  getProductFromDB,
  getAllProductsFromDB,
};

if (require.main === module) {
  main().catch((err) => {
    console.error("\nFatal error:", err.message);
    process.exit(1);
  });
}
