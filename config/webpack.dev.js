const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: '192.168.0.1',
    port: 3000,
    historyApiFallback: true
  }
})
