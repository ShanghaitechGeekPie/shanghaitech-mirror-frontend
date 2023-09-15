import { resolve } from 'path'
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import { compression } from 'vite-plugin-compression2'
import viteReact from '@vitejs/plugin-react-swc'
import viteProgress from 'vite-plugin-progress'
import viteSvgr from '@honkhonk/vite-plugin-svgr'
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
    ViteMinifyPlugin(),
    compression({
      algorithm: 'brotliCompress'
    }),
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
