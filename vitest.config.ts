import { defineConfig } from 'vitest/config';
import path from 'path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

// Two projects so the Storybook addon finds "storybook" and npm run test can run only "unit".
// See: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    globals: true,
    projects: [
      // Unit tests — run with `npm run test` (--project=unit)
      {
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts?(x)'],
          environment: 'happy-dom',
          setupFiles: ['./src/setupTests.ts'],
        },
      },
      // Storybook Test — required for the Storybook UI addon; run with `npm run test-storybook`
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(import.meta.dirname, '.storybook'),
            storybookScript: 'npm run storybook -- --no-open',
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
