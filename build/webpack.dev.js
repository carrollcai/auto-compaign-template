/**
 * @author carroll
 * @since 20180723
 * @example NAME="filename" npm run start
 * @description 路径为文件对应的全路径,`http://localhost:9000/src/modules/xyyx2018/index.html`
*/

const config = require('../config');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
const modulesPath = path.resolve(__dirname, '../src/modules');
const files = fs.readdirSync(modulesPath);

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

// 判断名称必填
if (!process.env.NAME) {
  throw new Error('NAME is must, please use "NAME=test npm run start"!');
}
// 判断名称是否不存在
if (!files.includes(process.env.NAME)) {
  throw new Error('NAME is not exist, please check!');
}

const devWebpackConfig = merge(baseWebpackConfig, {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: `./src/modules/${process.env.NAME}/app.js`
  },
  output: {
    path: path.resolve(__dirname, `./src/modules/${process.env.NAME}`),
    filename: '[name].js',
  },
  devServer: {
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: `./src/modules/${process.env.NAME}/index.html`,
      template: `./src/modules/${process.env.NAME}/index.html`,
      // inject: true
      inject: 'body',
      // chunks
    }),
  ]
});

module.exports = devWebpackConfig;