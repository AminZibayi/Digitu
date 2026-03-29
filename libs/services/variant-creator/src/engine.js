const { normalizeSizeKey } = require("./config");

function normalizeTitle(value) {
  return String(value || "").toLocaleLowerCase("fa-IR");
}

function includesAny(haystack, needles) {
  if (!needles || needles.length === 0) {
    return true;
  }

  return needles.some((needle) => haystack.includes(String(needle).toLocaleLowerCase("fa-IR")));
}

function matchRule(rule, sizeKey, normalizedTitle) {
  const normalizedSize = normalizeSizeKey(sizeKey);
  const sizesAny = (rule.when && rule.when.sizesAny ? rule.when.sizesAny : []).map(normalizeSizeKey);
  const includes = rule.when && rule.when.titleIncludesAny ? rule.when.titleIncludesAny : [];
  const excludes = rule.when && rule.when.titleExcludesAny ? rule.when.titleExcludesAny : [];

  if (sizesAny.length > 0 && !sizesAny.includes(normalizedSize)) {
    return false;
  }

  if (!includesAny(normalizedTitle, includes)) {
    return false;
  }

  if (excludes.length > 0 && includesAny(normalizedTitle, excludes)) {
    return false;
  }

  return true;
}

function getBasePrice(config, sizeKey) {
  const normalized = normalizeSizeKey(sizeKey);
  const bySize = config.pricing.basePriceBySize || {};
  for (const key of Object.keys(bySize)) {
    if (normalizeSizeKey(key) === normalized) {
      return Number(bySize[key]);
    }
  }

  if (config.pricing.defaultBasePrice) {
    return Number(config.pricing.defaultBasePrice);
  }

  throw new Error(`No base price configured for size '${sizeKey}' and no defaultBasePrice set`);
}

function resolveRulePrice(rule, config) {
  if (rule.then && typeof rule.then.setBasePrice === "number") {
    return Number(rule.then.setBasePrice);
  }

  if (rule.then && typeof rule.then.setUsdPrice === "number") {
    const rate = Number(config.pricing.usdToBaseRate);
    return Math.round(Number(rule.then.setUsdPrice) * rate);
  }

  return null;
}

function selectRules(config, sizeKey, normalizedTitle) {
  const sorted = [...(config.pricing.rules || [])].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.id.localeCompare(b.id);
  });

  return sorted.filter((rule) => matchRule(rule, sizeKey, normalizedTitle));
}

function applyRules({ basePayload, basePrice, config, matchedRules }) {
  const mode = config.pricing.conflictResolution;
  const selectedRules = mode === "last-match-wins" ? matchedRules : matchedRules.slice(0, 1);

  let finalPrice = basePrice;
  let payload = { ...basePayload };

  for (const rule of selectedRules) {
    const nextPrice = resolveRulePrice(rule, config);
    if (nextPrice !== null) {
      finalPrice = nextPrice;
    }

    if (rule.then && rule.then.overrideFields) {
      payload = { ...payload, ...rule.then.overrideFields };
    }
  }

  return {
    finalPrice,
    payload,
  };
}

function buildVariantDrafts(config, product) {
  const normalizedTitle = normalizeTitle(product.productTitle);
  const activeSizes = config.sizes.filter((size) => size.active !== false);

  return activeSizes.map((size) => {
    const basePayload = {
      ...config.variantDefaults,
      id: null,
      site: config.api.site || "digikala",
      theme_values: [
        {
          theme_value_id: size.themeValueId,
          theme_id: config.api.themeId,
        },
      ],
    };

    const basePrice = getBasePrice(config, size.key);
    const matchedRules = selectRules(config, size.key, normalizedTitle);
    const { finalPrice, payload } = applyRules({
      basePayload,
      basePrice,
      config,
      matchedRules,
    });

    return {
      productId: product.productId,
      productTitle: product.productTitle,
      sizeKey: size.key,
      themeValueId: size.themeValueId,
      matchedRuleIds: matchedRules.map((rule) => rule.id),
      payload: {
        ...payload,
        price: finalPrice,
      },
    };
  });
}

module.exports = {
  buildVariantDrafts,
  matchRule,
};
