import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import manifest from './manifest.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

export default defineConfig({
  base: './',
  plugins: [react(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: { port: 5173 },
  },
})