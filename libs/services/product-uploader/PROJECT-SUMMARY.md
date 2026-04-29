# Project Summary

Repository purpose:

- Automate Digikala seller product creation for category `6946` from CSV.

Execution model:

- `cli.js`: validation and interactive operator review
- `digikala-uploader.js`: real API execution

Current data model highlights:

- explicit `division_id`
- explicit `product_type_ids`
- full observed 6946 attribute map
- backward compatibility for legacy CSV columns

Primary references:

- `API-SPEC.md` (canonical request contracts)
- `CSV-SPEC.md` (canonical CSV structure)
- `API-VALIDATION.md` (verified vs environment-dependent behavior)
- `products.csv` (clean sample template)

Recommended operator flow:

1. validate CSV
2. review interactively
3. upload one row test
4. run full batch
5. inspect `upload_results.json`
