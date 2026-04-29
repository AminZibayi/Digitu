# AGENTS

This file defines working rules for coding agents in this repository.

use pnpm

## Project Context

- Goal: automate Digikala Seller product creation from CSV input.
- Primary scripts:
  - cli.js: interactive CSV validation and operator flow.
  - digikala-uploader.js: API execution flow and upload pipeline.
- Reference source of truth for API shape: apiExamples.js and seller.digikala.com.har.

## Safety Rules

- Never log or commit session cookies or access tokens.
- Redact sensitive headers in docs, examples, and errors.
- Do not hardcode credentials in source files but .env.
- Keep authentication material in environment variables when possible.

## Coding Rules

- Use plain Node.js and existing dependency style.
- Keep functions focused and side effects explicit.
- Add validation before API calls, not after failures.
- Keep error messages actionable with row numbers and field names.
- Prefer deterministic parsing for CSV and ID lists.

## Digikala Workflow Expectations

- Validate CSV structure and required columns before any upload step.
- Validate file existence for all image paths before upload.
- Upload sequence should remain:
  1. create draft basic info
  2. save attributes and dimensions
  3. save titles
  4. upload images
  5. finalize product with image order
- Keep pacing delays to reduce throttling risk.

## Change Management

- For API changes, update both:
  - API-SPEC.md
  - CSV-SPEC.md if payload or fields changed
- For CLI behavior changes, update README.md usage examples.
- Keep docs and implementation synchronized in the same change.

## Validation Checklist Before Finishing

- Run a quick static sanity pass on edited files.
- Ensure commands in README still match package.json scripts.
- Confirm no secrets were added in diffs.
- Confirm new required CSV fields are documented.

## Preferred Test Strategy

- Start with validate-only flow on products.csv.
- Run a dry run before real upload behavior.
- Test with one product row before batch runs.
- Use resume mode for failed rows after fixes.

## Output Expectations For Agents

- Report findings first when reviewing code.
- Include exact file paths for all modified files.
- Call out assumptions clearly when API behavior is inferred.
- If uncertain about endpoint contracts, ask for HAR confirmation.
