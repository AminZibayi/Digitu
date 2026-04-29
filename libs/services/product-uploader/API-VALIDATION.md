# API Validation Status

This document tracks what is verified from captured traffic and what still depends on runtime environment.

## Verified from `seller.digikala.com.har` / `apiExamples.js`

- endpoint family under `/api/v2/product-creation/*`
- multi-phase `save` flow
- `auto-title/save` payload shape
- image upload multipart shape (`file`, `slot`)
- finalization `photos_detail` structure
- presence of distinct `division_id` and `product_type_ids`
- attribute ID map for category `6946` observed in draft payload

## Verified in current implementation

- phase order matches observed flow
- response guard on `status === "ok"`
- image encrypted ID extraction supports observed response nesting
- compatibility layer for old CSV attribute columns
- env-based cookie support (`DIGIKALA_COOKIE`)

## Not statically guaranteed (environment-dependent)

- cookie freshness / auth validity
- brand and option ID validity at upload time
- category schema changes after capture date
- business-rule moderation outcomes (title/content/image quality)

## Operational Preflight (recommended)

1. `node cli.js --validate products.csv`
2. run one-row upload test
3. inspect created product on seller panel
4. continue with full batch only after successful single-row result
