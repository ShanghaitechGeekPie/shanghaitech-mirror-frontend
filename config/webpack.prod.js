const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|md|html)(\?.*)?$/i
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          chunks: 'all',
          name: 'vendors',
          minChunks: 3
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public/robots.txt'),
          to: './'
        },
        {
          from: path.resolve(__dirname, '../public/logo'),
          to: './logo'
        },
      ]
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'report.html'
    })
  ]
})
