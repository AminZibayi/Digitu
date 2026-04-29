# AGENTS.md

This file defines repo-specific guidance for human contributors and coding agents.

## Project Summary

- Name: `digikala-variant-creator`
- Type: Node.js CLI application
- Purpose: Create Digikala product variants for existing products based on YAML configuration and JSON input.

## Expected Inputs/Outputs

- Config schema source of truth: `schemas/config.schema.json`
- Example config: `config.example.yaml`
- Input fixture example: `fixtures/products.sample.json`
- Runtime logs: `logs/variant-creator.log`
- Runtime result files: `output/results-<timestamp>.json`
- Idempotency state: `output/idempotency-state.json`

## Code Areas

- CLI and argument parsing: `src/cli.js`
- Config and input loading: `src/config.js`
- Pricing/rule engine: `src/engine.js`
- API client: `src/client.js`
- Orchestration and idempotency: `src/runner.js`
- Logging implementation: `src/logger.js`
- Scraped API of digikala: `scraped/variantAPI.js`

## Change Guidelines

- Keep changes scoped to the user request; avoid unrelated refactors.
- Preserve deterministic pricing behavior and rule conflict resolution semantics.
- Keep dry-run behavior side-effect free (no API POST).
- Maintain idempotency guarantees when touching create flow.
- Update tests in `test/` when behavior changes.

## Validation Checklist

- Run `pnpm test` after code changes.
- If CLI behavior changed, run at least one dry-run command with sample fixtures.
- Ensure no secrets are committed (`.env`, cookies, local credentials).

## Style and Conventions

- Use CommonJS (`require/module.exports`) to match the codebase.
- Prefer small, explicit functions with clear names.
- Keep logging structured and consistent with existing logger usage.
- Avoid introducing new dependencies unless clearly justified.

## Notes for Agents

- Read `README.md` and `LOGGING.md` for workflow and logging expectations before major changes.
- Treat files in `logs/` and `output/` as generated artifacts.
- Do not commit machine-specific or secret-bearing files.
