const fs = require("fs");
const path = require("path");
const YAML = require("yaml");
const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function expandEnvTokens(value) {
  if (typeof value === "string") {
    return value.replace(/\$\{([A-Z0-9_]+)\}/g, (match, envName) => {
      return Object.prototype.hasOwnProperty.call(process.env, envName) ? process.env[envName] : match;
    });
  }

  if (Array.isArray(value)) {
    return value.map(expandEnvTokens);
  }

  if (value && typeof value === "object") {
    const next = {};
    for (const [key, nested] of Object.entries(value)) {
      next[key] = expandEnvTokens(nested);
    }
    return next;
  }

  return value;
}

function normalizeSizeKey(value) {
  return String(value).trim().toLowerCase().replace(/[\s]+/g, "").replace(/[x×*]/g, "x");
}

function buildValidator() {
  const schemaPath = path.resolve(__dirname, "../schemas/config.schema.json");
  const schema = readJson(schemaPath);
  const ajv = new Ajv2020({ allErrors: true, useDefaults: true, strict: false });
  addFormats(ajv);
  return ajv.compile(schema);
}

function formatAjvErrors(errors) {
  return errors.map((err) => {
    const pathText = err.instancePath || "/";
    return `${pathText} ${err.message}`;
  });
}

function validateCrossFields(config) {
  const problems = [];
  const normalizedSizeKeys = new Set();

  if (/\$\{[A-Z0-9_]+\}/.test(config.api.cookie)) {
    problems.push("api.cookie includes unresolved environment token. Set the variable before running.");
  }

  for (const size of config.sizes) {
    const normalized = normalizeSizeKey(size.key);
    if (normalizedSizeKeys.has(normalized)) {
      problems.push(`Duplicate size key detected after normalization: ${size.key}`);
    }
    normalizedSizeKeys.add(normalized);
  }

  const basePriceKeys = Object.keys(config.pricing.basePriceBySize || {}).map(normalizeSizeKey);
  for (const key of basePriceKeys) {
    if (!normalizedSizeKeys.has(key)) {
      problems.push(`basePriceBySize has key '${key}' that does not exist in sizes`);
    }
  }

  const hasUsdRule = (config.pricing.rules || []).some((rule) =>
    Object.prototype.hasOwnProperty.call(rule.then || {}, "setUsdPrice")
  );
  if (hasUsdRule && !config.pricing.usdToBaseRate) {
    problems.push("pricing.usdToBaseRate is required when any rule uses then.setUsdPrice");
  }

  return problems;
}

function loadConfig(configPath) {
  const absolutePath = path.resolve(configPath);
  const rawText = fs.readFileSync(absolutePath, "utf8");
  const parsed = expandEnvTokens(YAML.parse(rawText));
  const validate = buildValidator();

  const valid = validate(parsed);
  if (!valid) {
    const details = formatAjvErrors(validate.errors || []);
    throw new Error(`Config validation failed:\n- ${details.join("\n- ")}`);
  }

  const crossFieldProblems = validateCrossFields(parsed);
  if (crossFieldProblems.length > 0) {
    throw new Error(`Config validation failed:\n- ${crossFieldProblems.join("\n- ")}`);
  }

  return parsed;
}

function loadProducts(inputPath) {
  const absolutePath = path.resolve(inputPath);
  const text = fs.readFileSync(absolutePath, "utf8");
  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(`Products input must be valid JSON array: ${error.message}`);
  }

  if (!Array.isArray(parsed)) {
    throw new Error("Products input must be a JSON array");
  }

  return parsed.map((row, index) => {
    const rowNumber = index + 1;
    const productId = Number(row.productId);
    const productTitle = String(row.productTitle || "").trim();

    if (!Number.isInteger(productId) || productId <= 0) {
      throw new Error(`Invalid productId at row ${rowNumber}: '${row.productId}'`);
    }

    if (!productTitle) {
      throw new Error(`Missing productTitle at row ${rowNumber}`);
    }

    return { productId, productTitle };
  });
}

module.exports = {
  loadConfig,
  loadProducts,
  normalizeSizeKey,
};
