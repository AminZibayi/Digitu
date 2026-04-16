import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@digikala/core': path.resolve(__dirname, 'packages/core/src'),
    },
  },
  test: {
    globals: true,
    exclude: [
      ...configDefaults.exclude,
      '**/.worktrees/**',
      '**/worktrees/**',
    ],
  },
});
