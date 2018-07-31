/**
 * @author carroll
 * @since 20180723
 * @example NAME="filename" npm run build
 * @description 打包文件在dist/"filename"下，实现功能es6转es5，打包压缩文件。
*/

const baseWebpackConfig = require('./webpack.base.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const config = require('../config');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');
const utils = require('./utils.js');

const modulesPath = path.resolve(__dirname, '../src/modules');
const files = fs.readdirSync(modulesPath);

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.join(assetsSubDirectory, _path)
}

// 判断名称必填
if (!process.env.NAME) {
  throw new Error('NAME is must, please use "NAME=test npm run build"!');
}
// 判断名称是否不存在
if (!files.includes(process.env.NAME)) {
  throw new Error('NAME is not exist, please check!');
}

const prodWebpackConfig = merge(baseWebpackConfig, {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: `./src/modules/${process.env.NAME}/app.js`
  },
  output: {
    path: config.build.assetsRoot,
    filename: assetsPath('js/[name].[chunkhash].js'),
    // 公共模块单独抽离，且保持hash不变
    chunkFilename: assetsPath('js/[id].[chunkhash].js')
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
        // 将css从js中抽离出来
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader']
        })
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: assetsPath('css/[name].[contenthash].css'),
      allChunks: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),
    ...utils.setHtmlWebpackPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),
  ]
});

module.exports = prodWebpackConfig;