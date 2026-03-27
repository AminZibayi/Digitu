# DigikalaAuto

Automates Digikala Seller product creation for category `6946` (تابلو) from CSV input.

This repository has two executables:

- `cli.js`: CSV validation and interactive operator review (no API upload).
- `digikala-uploader.js`: actual API execution (create draft, save attributes, save title, upload images, finalize).

## Requirements

- Node.js 14+
- Valid Digikala seller session cookie
- CSV file following `CSV-SPEC.md`

## Install

```bash
pnpm install
```

(or `npm install`)

## Authentication

Uploader reads cookie from:

1. `DIGIKALA_COOKIE` environment variable (recommended), or
2. `CONFIG.cookie` in `digikala-uploader.js`

Example (PowerShell):

```powershell
$env:DIGIKALA_COOKIE = "PHPSESSID=...; tracker_session=...; seller_api_access_token=...; seller_api_otp_token=..."
```

## Typical Workflow

1. Validate CSV and review rows:

```bash
node cli.js --validate products.csv
node cli.js --upload products.csv
```

2. Run real upload after review:

```bash
node digikala-uploader.js products.csv
```

3. Check result log:

- `upload_results.json`

## CLI Commands

```bash
node cli.js --help
node cli.js --validate products.csv
node cli.js --upload products.csv
node cli.js --dry-run products.csv
node cli.js --auto products.csv
```

Behavior summary:

- `--validate`: parse + validate only.
- `--upload`: validate + interactive review + command handoff suggestion.
- `--dry-run`: validate/review only, explicit no-handoff mode.
- `--auto`: validate without interactive review.

## Uploader Workflow

`digikala-uploader.js` preserves this order:

1. `POST /product-creation/save` (basic info + draft create)
2. `POST /product-creation/save` (attributes/dimensions)
3. `POST /product-creation/auto-title/save`
4. `POST /product-creation/images/upload` (for each image)
5. `POST /product-creation/save` (finalize with `photos_detail`)

## Key Data Model Notes

- `division_id` and `product_type_ids` are separate fields.
- CSV supports modern columns and legacy aliases for backward compatibility.
- For category `6946`, attribute payload is sent as `attributes[6946][attribute_id]`.

See `API-SPEC.md` for exact payload examples.

## Important Files

- `digikala-uploader.js`: upload runtime
- `cli.js`: validation and review runtime
- `CSV-SPEC.md`: canonical CSV structure
- `API-SPEC.md`: API payload contracts
- `products.csv`: clean template
- `apiExamples.js`: captured fetch examples (reference)
- `seller.digikala.com.har`: captured network traffic (reference)

## Safety Notes

- Never commit real cookies or tokens.
- Refresh token when uploader starts returning authorization failures.
- Test with one row before large batches.
- Use resume-style reruns only after fixing the root cause of failed rows.
