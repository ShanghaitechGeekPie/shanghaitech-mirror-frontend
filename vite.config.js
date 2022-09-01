import path from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin as viteHtml } from 'vite-plugin-html'
import viteReact from '@vitejs/plugin-react'
import viteProgress from 'vite-plugin-progress'
import viteSvgr from '@honkhonk/vite-plugin-svgr'
import viteCompression from 'vite-compression-plugin'
import esbuildFixVirtualized from './src/plugins/esbuildFixVirtualized'

export default defineConfig({
  plugins: [
    viteSvgr(),
    viteReact(),
    viteProgress(),
    viteHtml({
      minify: true,
      entry: '/src/index.jsx'
    }),
    viteCompression({
      loginfo: 'silent',
      algorithm: 'brotliCompress'
    })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
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
