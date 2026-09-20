/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src')
    }
  },
  // govuk-frontend.min.css still ships an old IE `@media screen\0` hack.
  css: {
    lightningcss: {
      errorRecovery: true
    }
  },
  plugins: [dts({ include: ['lib', 'src'] }), libCss()],
  build: {
    lib: {
      entry: path.resolve(import.meta.dirname, 'lib/main.ts'),
      name: '@rottitime/govuk-design-react',
      fileName: (format) => `main.${format}.js`
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react/jsx-dev-runtime': 'jsxDevRuntime'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  }
})
