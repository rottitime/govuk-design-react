/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [react(), dts(), libCss()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'main.ts'),
      name: '@rottitime/govuk-design-react',
      fileName: (format) => `main.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom']
    },
    sourcemap: true,
    emptyOutDir: true
  }
})
