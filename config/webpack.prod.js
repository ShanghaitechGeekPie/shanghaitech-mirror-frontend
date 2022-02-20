const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const productionGzipExtensions = /\.(js|css|json|md|html|svg)(\?.*)?$/i

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10,
          enforce: true
        }
      }
    }
  },
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
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html'
    })
  ]
})
