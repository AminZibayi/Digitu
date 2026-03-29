const { buildVariantDrafts } = require("../src/engine");

const baseConfig = {
  api: {
    themeId: 1,
    site: "digikala",
  },
  variantDefaults: {
    package_weight: 700,
    package_length: 100,
    package_height: 10,
    package_width: 100,
    lead_time: 2,
    marketplace_seller_stock: 100,
    order_limit: 30,
    warranty_id: 272,
    is_active: true,
    supplier_code: "",
    fbs_lead_time: 48,
    shipping_type: "both",
  },
  sizes: [
    { key: "100x70", themeValueId: 108432, active: true },
    { key: "130x200", themeValueId: 105738, active: true },
  ],
  pricing: {
    baseCurrency: "IRR",
    usdToBaseRate: 900000,
    basePriceBySize: {
      "100x70": 20000000,
      "130x200": 25000000,
    },
    conflictResolution: "first-match-wins",
    rules: [
      {
        id: "kerm-rule",
        priority: 10,
        when: {
          sizesAny: ["100x70"],
          titleIncludesAny: ["کرم"],
        },
        then: {
          setUsdPrice: 100,
        },
      },
      {
        id: "fallback-large",
        priority: 20,
        when: {
          sizesAny: ["130x200"],
        },
        then: {
          setBasePrice: 27000000,
        },
      },
    ],
  },
};

describe("pricing engine", () => {
  it("applies Persian keyword rule and converts USD", () => {
    const drafts = buildVariantDrafts(baseConfig, {
      productId: 1,
      productTitle: "تابلو کرم کلاسیک",
    });

    const for100x70 = drafts.find((d) => d.sizeKey === "100x70");
    expect(for100x70.payload.price).toBe(90000000);
    expect(for100x70.matchedRuleIds).toContain("kerm-rule");
  });

  it("uses deterministic first-match-wins behavior", () => {
    const config = JSON.parse(JSON.stringify(baseConfig));
    config.pricing.rules.unshift({
      id: "override-earlier",
      priority: 5,
      when: { sizesAny: ["100x70"], titleIncludesAny: ["کرم"] },
      then: { setBasePrice: 123456 },
    });

    const drafts = buildVariantDrafts(config, {
      productId: 2,
      productTitle: "تابلو کرم مدرن",
    });

    const item = drafts.find((d) => d.sizeKey === "100x70");
    expect(item.payload.price).toBe(123456);
    expect(item.matchedRuleIds[0]).toBe("override-earlier");
  });
});
