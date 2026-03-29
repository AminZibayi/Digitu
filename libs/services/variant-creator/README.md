# Digikala Variant Creator (Subproject)

راهنمای فارسی: [README.fa.md](README.fa.md)

Production-oriented, YAML-driven single application for variant creation on existing Digikala products.

## Scope

This subproject only handles variant creation for existing `productId` records.
It does not create products, attributes, or images.

## App Structure

- `src/cli.js`: CLI entrypoint.
- `src/config.js`: YAML parsing and schema validation.
- `src/engine.js`: deterministic size/price rule matching.
- `src/client.js`: Digikala variant API GET/POST with retry behavior.
- `src/runner.js`: orchestration, idempotency, output files.
- `schemas/config.schema.json`: config schema source of truth.
- `test/*.test.js`: unit tests.

## Install

```bash
cd variant-creator
pnpm install
```

## Input Format

Product input file must be JSON array with this shape:

```json
[{ "productId": 21581903, "productTitle": "تابلو کرم" }]
```

See `fixtures/products.sample.json`.

## Configuration (Single Source of Truth)

Use `config.example.yaml` as the base.

- `sizes`: multiple sizes per run.
- `pricing.basePriceBySize`: base price per size.
- `pricing.rules`: conditional price/field overrides by size and title keyword match.
- `variantDefaults`: constant fields applied to every variant.
- `variantDefaultsBySize` (optional): per-size overrides for variant defaults such as package dimensions and weight.
- `idempotency`: duplicate-prevention settings.

### Rule Conflict Resolution

Set exactly one mode:

- `first-match-wins`: only the highest-priority matched rule is applied.
- `last-match-wins`: all matched rules are applied in priority order, later rule can override earlier fields.

Rules are deterministic:

1. sorted by `priority` ascending
2. tie-break by `id` lexicographically
3. resolved using `pricing.conflictResolution`

## Example Rule

```yaml
- id: size-100x70-kerm-usd
  priority: 10
  when:
    sizesAny: [100x70]
    titleIncludesAny: ["کرم"]
  then:
    setUsdPrice: 100
```

With `usdToBaseRate`, this converts 100 USD to base currency amount.

## Run Commands

Generic run with custom files:

```bash
pnpm start -- --config ./config.example.yaml --input ./fixtures/products.sample.json --output-dir ./output
```

Live-test fixture dry-run (no POST):

```bash
pnpm dry-run
```

Live-test fixture real update:

```bash
pnpm update
```

Verbose logs with custom files:

```bash
pnpm start -- --config ./config.example.yaml --input ./fixtures/products.sample.json --dry-run --verbose
```

## Logging

The app includes a comprehensive logging system that captures all operations to both console and file.

- **Default (INFO level)**: INFO, WARN, ERROR messages
- **Verbose mode (`--verbose`)**: DEBUG messages + all above
- **Log file**: `./logs/variant-creator.log` (created automatically, cleared per run)
- **Format**: `[TIMESTAMP] [LEVEL] Message {"structured":"data"}`

Example:

```
[2026-03-28 05:13:19.680] [INFO ] Starting Digikala Variant Creator {...}
[2026-03-28 05:13:19.746] [INFO ] Processing product {"productId":21581903,...}
[2026-03-28 05:13:19.850] [INFO ] Variant created successfully {"variantId":77948925,...}
```

See [LOGGING.md](LOGGING.md) for detailed logging documentation, parsing logs, and monitoring examples.

## Outputs

- Structured JSON log lines on stdout/stderr.
- Per-run result file in output directory:
  - `results-<timestamp>.json`
- Idempotency state file:
  - default `idempotency-state.json`

Per product, result includes:

- success/failure
- each variant outcome (`created`, `dry_run`, `skipped_duplicate`)
- failure reason (if any)

## Safety and Reliability

- Validates config and input before any API POST.
- Dry-run mode computes exact payload and prices only.
- Retries transient API failures (`429`, `5xx`, network).
- Idempotency safeguards:
  - checks local state fingerprints
  - attempts to detect already-existing variants from API GET

## Tests

```bash
pnpm test
```

Covers:

- pricing/rule matching and deterministic resolution
- config parsing and validation rules

## Notes

- Keep authentication cookie in env or private local config, never in git.
- Persian keyword matching is supported via Unicode string matching.
