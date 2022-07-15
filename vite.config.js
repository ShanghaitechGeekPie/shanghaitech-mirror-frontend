import { defineConfig } from 'vite'
import viteSvgr from 'vite-plugin-svgr'
import viteReact from '@vitejs/plugin-react'
import viteProgress from 'vite-plugin-progress'
import viteCompression from 'vite-plugin-compression'
import esbuildFixVirtualized from './src/plugins/esbuildFixVirtualized'
import path from 'path'

export default defineConfig({
  plugins: [
    viteSvgr(),
    viteReact(),
    viteProgress(),
    viteCompression({ algorithm: 'brotliCompress' })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFixVirtualized()],
    }
  }
})
