/* eslint-disable camelcase */
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { compression } from 'vite-plugin-compression2'
import viteReact from '@vitejs/plugin-react-swc'
import viteProgress from 'vite-plugin-progress'
import viteSvgr from '@honkhonk/vite-plugin-svgr'
import { splitVendorChunkPlugin } from 'vite'
import { replaceCodePlugin } from "vite-plugin-replace"

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
    compression({
      algorithm: 'brotliCompress'
    }),
    createHtmlPlugin({
      minify: true,
      entry: '/src/index.tsx'
    }),
    splitVendorChunkPlugin(),
    replaceCodePlugin({
      replacements: [
        /*
          The entities.json required by markdown-it is too large
          and we don't need it, so replace it with an empty object.
        */
        {
          from: "require('entities/lib/maps/entities.json');",
          to: "{}"
        },
      ],
    }),
  ],
  build: {
    minify: 'terser',
    reportCompressedSize: false,
    terserOptions: {
      compress: {
        passes: 3,
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
