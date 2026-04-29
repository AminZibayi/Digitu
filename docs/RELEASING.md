# Releasing Digikala Auto

1. Ensure all changes are merged to `main`.
2. Run `pnpm run release` to automatically bump the version, generate the changelog, create a tag, and create a GitHub release via Nx.
3. The tags will trigger the release workflow in GitHub Actions.
4. Verify release status in GitHub Actions tab.
