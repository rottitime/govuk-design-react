import { defineConfig } from 'vitest/config';
import path from 'path';

// Unit tests only — used by `npm run test` and `npm run test:coverage` so we don't load Storybook.
// The default vitest.config.ts has both unit + storybook so the Storybook addon can find "storybook".
export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.ts?(x)'],
    environment: 'happy-dom',
    setupFiles: ['./src/setupTests.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
