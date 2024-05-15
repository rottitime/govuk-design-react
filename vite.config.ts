import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: '@rottitime/govuk-design-react',
      fileName: (format) => `main.${format}.js`
    },
    copyPublicDir: false,
    sourcemap: true,
    emptyOutDir: true
  }
})
