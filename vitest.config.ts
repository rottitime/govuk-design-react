import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    include: ['**/?(*.)test.ts?(x)'],
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
