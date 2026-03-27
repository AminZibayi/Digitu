// ============================================================
// digikala-uploader.js
// Bulk product uploader for Digikala Seller Platform
// Category: تابلو (6946)
//
// Usage:   node digikala-uploader.js products.csv
// Requires: npm install csv-parse form-data node-fetch@2
// ============================================================

'use strict';

const fs      = require('fs');
const path    = require('path');
const { parse } = require('csv-parse/sync');
const FormData  = require('form-data');
const fetch     = require('node-fetch');

// ────────────────────────────────────────────────────────────
// CONFIGURATION — update your session cookies here
// ────────────────────────────────────────────────────────────
const CONFIG = {
  baseUrl: 'https://seller.digikala.com/api/v2',

  // Copy the full cookie string from your browser DevTools.
  // The seller_api_access_token JWT expires — refresh as needed.
  cookie: [
    'PHPSESSID=YOUR_PHPSESSID',
    'tracker_session=YOUR_TRACKER_SESSION',
    'seller_api_access_token=YOUR_JWT_ACCESS_TOKEN',
    'seller_api_otp_token=YOUR_OTP_TOKEN',
  ].join('; '),

  // Milliseconds between each product (avoid rate limiting)
  delayBetweenProducts: 2000,
  // Milliseconds between each step within a product
  delayBetweenSteps: 600,
};

// ────────────────────────────────────────────────────────────
// CATEGORY 6946 CONSTANTS (تابلو)
// ────────────────────────────────────────────────────────────
const CATEGORY_ID = 6946;

// product_type_ids / divisions
const PAINTING_TYPES = {
  'تابلو':       [4928],
  'تابلو نوری':  [9657],
  'تابلو پازل': [9655],
};

// general_mefa_id options
const MEFA_IDS = {
  domestic: 893,   // تولید داخل
  imported: 894,   // وارداتی
};

// Known attribute IDs for category 6946
// (scraped from the live form save payload)
const ATTR = {
  SUBJECT:     '4931',   // موضوع — multi-select  → array of option IDs
  TECHNIQUE:   '5127',   // تکنیک — multi-select  → array of option IDs
  DESCRIPTION: '119',    // توضیحات — free text    → string
  PIECE_COUNT: '10130',  // تعداد قطعه — number   → string
};

// ────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function baseHeaders(extra = {}) {
  return {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.7',
    'captcha-token': '',
    priority: 'u=1, i',
    'x-web-optimize-response': '1',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    referer: 'https://seller.digikala.com/pwa/product/create/1',
    cookie: CONFIG.cookie,
    ...extra,
  };
}

async function apiCall(method, endpoint, body = null) {
  const url = `${CONFIG.baseUrl}${endpoint}`;
  const headers = baseHeaders(
    body ? { 'content-type': 'application/json' } : {}
  );
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res  = await fetch(url, opts);
  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response from ${endpoint}: ${text.slice(0, 200)}`);
  }

  if (json.status !== 'ok') {
    throw new Error(`API error [${endpoint}]: ${JSON.stringify(json).slice(0, 400)}`);
  }
  return json.data;
}

// ────────────────────────────────────────────────────────────
// STEP 1 — Create draft + save basic info
// Returns: draftProductId (number)
// ────────────────────────────────────────────────────────────
async function saveBasicInfo(p) {
  const data = await apiCall('POST', '/product-creation/save', {
    category_id:      CATEGORY_ID,
    brand_id:         p.brand_id,
    model:            p.model,
    product_type_ids: p.product_type_ids,
    is_iranian:       p.is_iranian,
    product_classes:  p.product_classes,
    general_mefa_id:  p.general_mefa_id,
    exclusive_mefa_id: '',
    fake: false,
  });

  // Response nesting varies — handle both shapes
  const draftId = data?.data?.draft_product_id
                ?? data?.draft_product_id
                ?? data?.id;

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
  if (p.attr_subject_ids?.length)   attrPayload[ATTR.SUBJECT]     = p.attr_subject_ids;
  if (p.attr_technique_ids?.length) attrPayload[ATTR.TECHNIQUE]   = p.attr_technique_ids;
  if (p.attr_description)           attrPayload[ATTR.DESCRIPTION] = p.attr_description;
  if (p.attr_piece_count)           attrPayload[ATTR.PIECE_COUNT]  = String(p.attr_piece_count);

  await apiCall('POST', '/product-creation/save', {
    draft_product_id: draftId,
    category_id:      CATEGORY_ID,
    attributes:       { [CATEGORY_ID]: attrPayload },
    advantages:       p.advantages,
    disadvantages:    p.disadvantages,
    // All dimensions in mm / grams per Digikala spec
    package_width:    p.package_width  || null,
    package_height:   p.package_height || null,
    package_length:   p.package_length || null,
    package_weight:   p.package_weight || null,
    width:            p.width  || 0,
    height:           p.height || 0,
    length:           p.length || 0,
    weight:           p.weight || 0,
  });
}

// ────────────────────────────────────────────────────────────
// STEP 3 — Save title
// ────────────────────────────────────────────────────────────
async function saveTitle(draftId, p) {
  await apiCall('POST', '/product-creation/auto-title/save', {
    draft_product_id: draftId,
    title_fa:         p.title_fa,
    title_en:         p.title_en || '',
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
  form.append('file', fs.createReadStream(imagePath), path.basename(imagePath));
  form.append('slot', String(slot));

  const res  = await fetch(`${CONFIG.baseUrl}/product-creation/images/upload`, {
    method:  'POST',
    headers: { ...baseHeaders(), ...form.getHeaders() },
    body:    form,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { throw new Error(`Image upload bad JSON: ${text.slice(0, 200)}`); }

  if (json.status !== 'ok') {
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
  const data = await apiCall('POST', '/product-creation/save', {
    category_id:      CATEGORY_ID,
    draft_product_id: draftId,
    only_b2b:         false,
    photos_detail: {
      main_image: main,
      order:      encryptedIds.join(','),
      images: [
        { encrypted_id: main, active: true },
        ...rest.map((id) => ({ encrypted_id: id })),
      ],
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
    process.stdout.write('  [1/5] Basic info ... ');
    const draftId = await saveBasicInfo(p);
    console.log(`✓ draft_id=${draftId}`);
    await sleep(CONFIG.delayBetweenSteps);

    // Step 2 — attributes
    process.stdout.write('  [2/5] Attributes  ... ');
    await saveAttributes(draftId, p);
    console.log('✓');
    await sleep(CONFIG.delayBetweenSteps);

    // Step 3 — title
    process.stdout.write('  [3/5] Title       ... ');
    await saveTitle(draftId, p);
    console.log('✓');
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
    process.stdout.write('  [5/5] Finalize    ... ');
    const productId = await finalizeProduct(draftId, encryptedIds);
    console.log(`✓  →  product_id=${productId}`);

    return { status: 'success', title: label, draftId, productId };

  } catch (err) {
    console.log(`\n  ❌ FAILED: ${err.message}`);
    return { status: 'failed', title: label, error: err.message };
  }
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
  const raw = fs.readFileSync(filePath, { encoding: 'utf-8' });
  // Strip BOM if present (common with Excel-saved UTF-8)
  const clean = raw.replace(/^\uFEFF/, '');
  const records = parse(clean, { columns: true, skip_empty_lines: true, trim: true });

  return records.map((r, i) => {
    // Resolve painting_type → product_type_ids
    const typeLabel = r.painting_type?.trim();
    const product_type_ids = PAINTING_TYPES[typeLabel] || PAINTING_TYPES['تابلو'];

    // Resolve general_mefa_id
    const mefaRaw = r.general_mefa_id?.trim().toLowerCase();
    const general_mefa_id = MEFA_IDS[mefaRaw] || parseInt(r.general_mefa_id) || MEFA_IDS.domestic;

    // Helper: parse a pipe-separated list of integers
    const parseIds = (s) =>
      (s || '').split('|').map((x) => parseInt(x.trim())).filter((n) => !isNaN(n));

    // Helper: parse a pipe-separated list of strings
    const parseStrings = (s) =>
      (s || '').split('|').map((x) => x.trim()).filter(Boolean);

    return {
      // Basic info
      brand_id:         parseInt(r.brand_id),
      model:            r.model,
      product_type_ids,
      is_iranian:       r.is_iranian?.trim().toLowerCase() !== 'false',
      product_classes:  parseStrings(r.product_classes),
      general_mefa_id,

      // Titles
      title_fa:         r.title_fa,
      title_en:         r.title_en || '',

      // Attributes (category 6946)
      attr_subject_ids:   parseIds(r.attr_subject_ids),
      attr_technique_ids: parseIds(r.attr_technique_ids),
      attr_description:   r.attr_description || '',
      attr_piece_count:   r.attr_piece_count  || '',

      // Pros / cons
      advantages:    parseStrings(r.advantages),
      disadvantages: parseStrings(r.disadvantages),

      // Product dimensions (mm / grams)
      width:  parseFloat(r.width)  || 0,
      height: parseFloat(r.height) || 0,
      length: parseFloat(r.length) || 0,
      weight: parseFloat(r.weight) || 0,

      // Package dimensions (mm / grams) — can be null
      package_width:  r.package_width  ? parseFloat(r.package_width)  : null,
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
    console.error('Usage: node digikala-uploader.js products.csv');
    process.exit(1);
  }
  if (!fs.existsSync(csvFile)) {
    console.error(`File not found: ${csvFile}`);
    process.exit(1);
  }

  console.log('='.repeat(52));
  console.log('  Digikala Bulk Product Uploader — تابلو (6946)');
  console.log('='.repeat(52));
  console.log(`CSV: ${csvFile}\n`);

  const products = parseCSV(csvFile);
  console.log(`Found ${products.length} product(s) to upload.\n`);

  const results = [];
  for (let i = 0; i < products.length; i++) {
    const result = await processProduct(products[i], i);
    results.push(result);
    if (i < products.length - 1) await sleep(CONFIG.delayBetweenProducts);
  }

  // ── Summary ──────────────────────────────────────────────
  const ok   = results.filter((r) => r.status === 'success');
  const fail = results.filter((r) => r.status === 'failed');

  console.log('\n' + '='.repeat(52));
  console.log(`  ✅ Succeeded: ${ok.length}   ❌ Failed: ${fail.length}`);
  console.log('='.repeat(52));

  if (ok.length) {
    console.log('\nSuccessful uploads:');
    ok.forEach((r) => console.log(`  ✓ "${r.title}" → product_id: ${r.productId}`));
  }
  if (fail.length) {
    console.log('\nFailed products:');
    fail.forEach((r) => console.log(`  ✗ "${r.title}": ${r.error}`));
  }

  const outFile = 'upload_results.json';
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\nFull log saved → ${outFile}`);
}

main().catch((err) => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
