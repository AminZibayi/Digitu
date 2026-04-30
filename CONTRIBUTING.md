# Contributing to Digikala Automation Suite

## Development Setup

### Prerequisites

- Node.js v20+
- pnpm v10+

### Installation

```bash
pnpm install
```

### Environment Variables

Create `.env` files as needed. See `README.md` for required variables:

```bash
DIGIKALA_COOKIE="your_cookie_string_here"
```

## Workflow

### Running Development

```bash
# Start entire workspace
pnpm run dev

# Start web stack only (frontend + backend)
pnpm run web

# Start a specific project
pnpm nx serve frontend
pnpm nx serve backend
pnpm nx serve desktop
```

### Building

```bash
pnpm run build
```

### Testing

```bash
pnpm run test
```

### Linting

```bash
pnpm run lint
```

## Code Standards

### Atomic Commits

Every fix or feature gets its own commit. Never batch unrelated changes into a single commit.

### Commit Messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

Examples:

```
feat(product-uploader): add CSV bulk import support
fix(variant-creator): handle missing price fields gracefully
docs(readme): update API documentation
```

### Nx Commands

Use `pnpm nx` instead of running nx globally:

```bash
pnpm nx build <project>
pnpm nx test <project>
pnpm nx lint <project>
pnpm nx affected --target=build
```

## Project Structure

```
apps/
  desktop/      # Electron desktop application
  frontend/    # Next.js React frontend
  backend/     # Express API server

libs/
  core/        # Shared utilities, API client, logging, DB management
  services/
    product-uploader/   # CLI tool for bulk product creation
    variant-creator/     # Service for variant/offer management
  branding/    # Shared branding assets
```

## Adding New Projects

Use Nx generators to add new apps or libraries:

```bash
pnpm nx generate @nx/react:app new-app
pnpm nx generate @nx/js:library new-lib
```

## Release Process

Releases are managed with `nx release`. See `docs/RELEASING.md` for details.

## Testing New Services

Service-specific documentation is in each service directory:

- `libs/services/product-uploader/README.md`
- `libs/services/variant-creator/README.md`

## Questions?

Open an issue for bugs, feature requests, or questions about the codebase.
