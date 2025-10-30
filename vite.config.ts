
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import viteSvgr from 'vite-plugin-svgr'
import viteReact from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
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
    server: {
      proxy: {
        '/api': {
          target: `https://${env.MIRROR_DOMAIN}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    },
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]'
        }
      }
    },
  }
})
