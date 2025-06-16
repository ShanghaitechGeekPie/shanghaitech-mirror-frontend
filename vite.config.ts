
import { resolve } from 'path'
import { defineConfig } from 'vite'
import viteSvgr from 'vite-plugin-svgr'
import viteReact from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig({
  server: {
    proxy: { // 代理后端到源站点，本地开发后端时请注释
      '/summary': {
        target: 'https://mirrors.shanghaitech.edu.cn',
        secure: false,
        changeOrigin: true,
      },
      '/downloads': {
        target: 'https://mirrors.shanghaitech.edu.cn',
        secure: false,
        changeOrigin: true,
      },
    }
  },
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
    viteCompression({
      algorithm: 'brotliCompress'
    }),
    ViteMinifyPlugin()
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