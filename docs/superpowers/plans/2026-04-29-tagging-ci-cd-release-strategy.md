# Tagging, CI/CD, and GitHub Release Strategy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement an automated CI/CD and release pipeline for the Digikala Auto monorepo using GitHub Actions, focusing on Electron app releases.

**Architecture:** A dual-workflow system consisting of a continuous integration (CI) workflow for all pushes and a release workflow triggered specifically by semantic version tags.

**Tech Stack:** GitHub Actions, pnpm, Nx, Electron Builder, Conventional Commits.

---

### Task 1: Initialize GitHub Workflows Directory

**Files:**
- Create: `.github/workflows/.gitkeep`

- [ ] **Step 1: Create the workflows directory**
Run: `mkdir -p .github/workflows`

- [ ] **Step 2: Add placeholder file**
Run: `touch .github/workflows/.gitkeep`

- [ ] **Step 3: Commit**
```bash
git add .github/workflows/.gitkeep
git commit -m "ci: initialize github workflows directory"
```

### Task 2: Implement CI Workflow

**Files:**
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: Write CI workflow configuration**
```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm nx run-many -t lint test build
```

- [ ] **Step 2: Commit**
```bash
git add .github/workflows/ci.yml
git commit -m "ci: add main ci workflow for linting, testing, and building"
```

### Task 3: Implement Release Workflow

**Files:**
- Create: `.github/workflows/release.yml`

- [ ] **Step 1: Write Release workflow configuration**
```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - name: Build Electron App
        run: pnpm nx run desktop:build
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Publish Release
        uses: softprops/action-gh-release@v1
        if: startsWith(github.ref, 'refs/tags/')
        with:
          files: |
            apps/desktop/dist/*.exe
            apps/desktop/dist/*.dmg
            apps/desktop/dist/*.AppImage
            apps/desktop/dist/*.zip
```

- [ ] **Step 2: Commit**
```bash
git add .github/workflows/release.yml
git commit -m "ci: add release workflow for automated github releases"
```

### Task 4: Configure Release Script in package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add release and versioning scripts**
```json
{
  "scripts": {
    "version": "standard-version",
    "release": "standard-version && git push --follow-tags origin main"
  }
}
```

- [ ] **Step 2: Install standard-version**
Run: `pnpm add -D standard-version`

- [ ] **Step 3: Commit**
```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add versioning and release scripts"
```

### Task 5: Final Verification and Documentation

**Files:**
- Create: `docs/RELEASING.md`

- [ ] **Step 1: Create release documentation**
```markdown
# Releasing Digikala Auto

1. Ensure all changes are merged to `main`.
2. Run `pnpm release` to bump version and create tag.
3. Push tags to GitHub to trigger the release workflow.
4. Verify release status in GitHub Actions tab.
```

- [ ] **Step 2: Commit**
```bash
git add docs/RELEASING.md
git commit -m "docs: add release documentation"
```
