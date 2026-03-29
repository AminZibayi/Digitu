const fs = require("fs");
const os = require("os");
const path = require("path");
const { loadConfig } = require("../src/config");

function writeTemp(content) {
  const filePath = path.join(os.tmpdir(), `variant-config-${Date.now()}-${Math.random()}.yaml`);
  fs.writeFileSync(filePath, content, "utf8");
  return filePath;
}

describe("config parser", () => {
  it("loads a valid config", () => {
    const filePath = writeTemp(`
version: 1
api:
  baseUrl: https://seller.digikala.com/api/v2
  cookie: sample-cookie
  referer: https://seller.digikala.com/pwa/product/1/variant
  themeId: 1
variantDefaults:
  package_weight: 700
  package_length: 100
  package_height: 10
  package_width: 100
  lead_time: 2
  marketplace_seller_stock: 100
  order_limit: 30
  warranty_id: 272
  is_active: true
  supplier_code: ""
  fbs_lead_time: 48
  shipping_type: both
sizes:
  - key: 100x70
    themeValueId: 10
pricing:
  baseCurrency: IRR
  basePriceBySize:
    100x70: 100000
  conflictResolution: first-match-wins
  rules: []
`);

    const config = loadConfig(filePath);
    expect(config.api.themeId).toBe(1);
    expect(config.sizes.length).toBe(1);
  });

  it("fails when setUsdPrice exists without usdToBaseRate", () => {
    const filePath = writeTemp(`
version: 1
api:
  baseUrl: https://seller.digikala.com/api/v2
  cookie: sample-cookie
  referer: https://seller.digikala.com/pwa/product/1/variant
  themeId: 1
variantDefaults:
  package_weight: 700
  package_length: 100
  package_height: 10
  package_width: 100
  lead_time: 2
  marketplace_seller_stock: 100
  order_limit: 30
  warranty_id: 272
  is_active: true
  supplier_code: ""
  fbs_lead_time: 48
  shipping_type: both
sizes:
  - key: 100x70
    themeValueId: 10
pricing:
  baseCurrency: IRR
  basePriceBySize:
    100x70: 100000
  conflictResolution: first-match-wins
  rules:
    - id: usd
      priority: 1
      when:
        titleIncludesAny: ["کرم"]
      then:
        setUsdPrice: 100
`);

    expect(() => loadConfig(filePath)).toThrow(/usdToBaseRate/);
  });

  it("fails when variantDefaultsBySize contains unknown size key", () => {
    const filePath = writeTemp(`
version: 1
api:
  baseUrl: https://seller.digikala.com/api/v2
  cookie: sample-cookie
  referer: https://seller.digikala.com/pwa/product/1/variant
  themeId: 1
variantDefaults:
  package_weight: 700
  package_length: 100
  package_height: 10
  package_width: 100
  lead_time: 2
  marketplace_seller_stock: 100
  order_limit: 30
  warranty_id: 272
  is_active: true
  supplier_code: ""
  fbs_lead_time: 48
  shipping_type: both
variantDefaultsBySize:
  130x200:
    package_weight: 1200
sizes:
  - key: 100x70
    themeValueId: 10
pricing:
  baseCurrency: IRR
  basePriceBySize:
    100x70: 100000
  conflictResolution: first-match-wins
  rules: []
`);

    expect(() => loadConfig(filePath)).toThrow(/variantDefaultsBySize/);
  });
});
