import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteBanner from 'vite-plugin-banner'
import viteReact from '@vitejs/plugin-react'
import viteProgress from 'vite-plugin-progress'
import viteSvgr from '@honkhonk/vite-plugin-svgr'
import viteCompression from 'vite-compression-plugin'
import esbuildFixVirtualized from './src/plugins/esbuildFixVirtualized'
import packageInfo from './package.json'

export default defineConfig({
  plugins: [
    viteSvgr(),
    viteReact(),
    viteProgress(),
    createHtmlPlugin({ minify: true, entry: '/src/index.jsx' }),
    viteBanner(`/**\n * name: ${packageInfo.name}\n * homepage: https://${packageInfo.domain}\n */`),
    viteCompression({ algorithm: 'brotliCompress', loginfo: 'silent' }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      filename: 'serviceWorker.js',
      workbox: {
        runtimeCaching: [{
          urlPattern: /^https:\/\/mirrors.shanghaitech.edu.cn\/(summary|downloads|api\/v1\/[^\s]+)/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'mirror-api-cache',
            expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 2 },
            cacheableResponse: { statuses: [0, 200] }
          }
        }]
      },
      manifest: {
        name: packageInfo.full_name,
        short_name: packageInfo.short_name,
        description: packageInfo.description,
        theme_color: '#B71C1C',
        icons: [{
          src: '/logo/favicon.svg',
          purpose: "maskable any",
          sizes: 'any'
        }]
      }
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
