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
    partialBundling: {
      enforceTargetMinSize: true,
      targetConcurrentRequests: 10,
      targetMinSize: 200 * 1024
    },
    output: {
      targetEnv: 'browser-esnext',
      filename: '[ext]/[resourceName].[contentHash].[ext]',
      assetsFilename: '[ext]/[resourceName].[contentHash].[ext]'
    },
    sourcemap: false
  },
  envPrefix: ['MIRROR_']
})
