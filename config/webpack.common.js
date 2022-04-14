const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const { IgnorePlugin } = require('webpack')
const path = require('path')
const chalk = require("chalk")

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    publicPath: '/',
    pathinfo: false,
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    symlinks: false,
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name][ext]'
        }
      },
      {
        test: /\.(md|template)$/,
        use: ['./src/plugins/raw-loader']
      }
    ],
    exprContextCritical: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      inject: 'body',
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../public/robots.txt'),
        to: './'
      },{
        from: path.resolve(__dirname, '../public/icon.svg'),
        to: './'
      }]
    }),
    new CleanWebpackPlugin(),
    new IgnorePlugin({
      resourceRegExp: /prismjs\/plugins/
    }),
    new ProgressBarPlugin({
      format: `:msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    })
  ],
  cache: {
    type: "filesystem"
  }
}
