import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteBanner from 'vite-plugin-banner'
import viteReact from '@vitejs/plugin-react'
import viteProgress from 'vite-plugin-progress'
import viteSvgr from '@honkhonk/vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'
import esbuildFixVirtualized from './src/plugins/esbuildFixVirtualized'
import packageInfo from './package.json'

export default defineConfig({
  plugins: [
    viteSvgr(),
    viteReact(),
    viteProgress(),
    createHtmlPlugin({ minify: true, entry: '/src/index.jsx' }),
    viteCompression({ algorithm: 'brotliCompress', deleteOriginFile: true }),
    viteBanner(`/**\n * name: ${packageInfo.name}\n * homepage: ${packageInfo.homepage}\n */`),
    VitePWA({ registerType: 'autoUpdate', injectRegister: 'inline', outDir: 'dist/js', filename: 'service-worker.js' })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  server: {
    port: 3000
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFixVirtualized()],
    }
  },
  build: {
    minify: "terser",
    assetsInlineLimit: 65536,
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
