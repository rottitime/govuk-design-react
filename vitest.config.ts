// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    include: ['**/?(*.)test.ts?(x)'],
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts'
  }
})
