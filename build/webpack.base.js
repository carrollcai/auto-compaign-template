/**
 * @author carroll
 * @since 20180719
 * @description 提供给开发和生产用的webpack公共配置
*/

const path = require('path');
const config = require('../config');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
}