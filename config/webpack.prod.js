const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|md|html)(\?.*)?$/i

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CompressionWebpackPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: productionGzipExtensions,
      compressionOptions: {
        level: 11
      },
      minRatio: 0.8
    }),
  ]
})
