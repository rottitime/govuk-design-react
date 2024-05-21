// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],

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
