# Desktop packaging notes

## Local packaging command

```bash
pnpm --filter @digikala/desktop build
```

This runs TypeScript compilation and packages a directory build via `electron-builder --dir`.

## Signed and unsigned artifact expectations

- Packaged output is written to `apps/desktop/release/win-unpacked`.
- If valid signing credentials are configured for `electron-builder`, the generated `.exe` is signed.
- If no signing credentials are present, packaging still succeeds and artifacts are generated unsigned.

## Native module and workspace dependency note

- `asar` is intentionally disabled for now because desktop dependencies are installed as pnpm workspace junctions (`workspace:*`) that resolve outside `apps/desktop`, and `electron-builder` fails directory packaging with `asar: true` in this layout.
- If runtime errors mention missing native bindings, reinstall dependencies from repo root:
  - `pnpm install`
- Re-run packaging after dependency changes:
  - `pnpm --filter @digikala/desktop build`
