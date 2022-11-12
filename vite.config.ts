/* eslint-disable camelcase */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteReact from '@vitejs/plugin-react'
import viteProgress from 'vite-plugin-progress'
import viteSvgr from '@honkhonk/vite-plugin-svgr'
import viteCompression from 'vite-compression-plugin'
import esbuildFixVirtualized from './src/plugins/esbuildFixVirtualized'

export default defineConfig({
  clearScreen: false,
  envPrefix: 'MIRROR_',
  json: { stringify: false },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins: [
    viteSvgr(),
    viteReact(),
    viteProgress(),
    createHtmlPlugin({
      minify: true,
      entry: '/src/index.tsx'
    }),
    viteCompression({
      loginfo: 'silent',
      algorithm: 'brotliCompress'
    })
  ],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFixVirtualized()]
    }
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssTarget: 'chrome61',
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
