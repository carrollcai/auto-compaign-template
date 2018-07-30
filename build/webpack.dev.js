/**
 * @author carroll
 * @since 20180723
 * @example NAME="filename" npm run start
 * @description 路径为文件对应的全路径,`http://localhost:9000/src/modules/xyyx2018/index.html`
*/

const config = require('../config');
const path = require('path');
const fs = require('fs');
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
  entry: {
    app: path.resolve(__dirname, `../src/modules/${process.env.NAME}/app.js`)
  },
  output: {
    path: path.resolve(__dirname, `../src/modules/${process.env.NAME}`),
    filename: '[name].js',
  },
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
  },
  module: {
    rules: [
      // 正确解析js和css文件
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      // 对js文件进行eslint校验，并把错误信息输入到浏览器上
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          // 是否将错误输出到浏览器页面上
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: `./src/modules/${process.env.NAME}/index.html`,
      template: `./src/modules/${process.env.NAME}/index.html`,
      inject: 'body'
    }),
  ]
});

module.exports = devWebpackConfig;