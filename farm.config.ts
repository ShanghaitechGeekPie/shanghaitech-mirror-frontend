import { resolve } from 'path'
import { defineConfig } from '@farmfe/core'
import viteSvgr from 'vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    ['@farmfe/plugin-react', { runtime: 'automatic' }]
  ],
  vitePlugins: [
    viteSvgr(),
    viteCompression({
      algorithm: 'brotliCompress'
    })
  ],
  compilation: {
    resolve: {
      alias: {
        '@': resolve(process.cwd(), './src')
      },
    },
    output: {
      targetEnv: 'browser-esnext',
      filename: '[ext]/[resourceName].[ext]',
      assetsFilename: '[ext]/[resourceName].[ext]'
    },
    comments: false,
    sourcemap: false
  },
  envPrefix: ['MIRROR_']
})
