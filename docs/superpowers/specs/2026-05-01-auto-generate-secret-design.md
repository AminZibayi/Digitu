# Digikala Auto Settings Encryption Design

## Context

The application stores Digikala cookies in `digikala-settings.secure.json`. Currently requires `DIGIKALA_SETTINGS_SECRET` environment variable to encrypt/decrypt. User wants zero-configuration: user imports cookies, app handles the rest.

## Decision

Auto-generate a random 32-byte secret at first startup. Store in `data/.master-key` (git-ignored). Use to encrypt settings.

## Implementation

### Secret Generation & Storage
- On first startup, check if `data/.master-key` exists
- If not, generate 32 random bytes via `crypto.randomBytes(32)`, store as hex string
- On subsequent startups, load secret from file

### SettingsStore Changes
- Accept secret directly instead of requiring env var
- `index.ts` obtains secret from master key file or generates one
- Same AES-256-GCM encryption remains, only the secret source changes

### File Structure
```
data/
  digikala-auto.pglite      # existing database
  digikala-settings.secure.json  # encrypted settings (existing)
  .master-key               # NEW: random secret for this installation
```

### Git Ignore
Add `data/.master-key` to `.gitignore`

## Security Note
This protects against casual file discovery. If an attacker gains access to the entire `data/` folder including `.master-key`, they can decrypt. This is acceptable for casual discovery prevention.

## Testing
- First run with no existing data creates `.master-key`
- Subsequent runs load existing key
- Settings save/load work correctly with auto-generated key