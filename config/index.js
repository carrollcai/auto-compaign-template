'use strict';

const path = require('path');
const proxy = require('./proxy.js');

module.exports = {
  dev: {
    assetsPublicPath: '/',
    proxyTable: proxy,
    host: 'localhost',
    port: 9000,
    useEslint: true,
    poll: false,
    autoOpenBrowser: true,
    errorOverlay: true,
    // 让错误信息显示到浏览器上
    useEslint: true,
    showEslintErrorsInOverlay: false
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, `../src/modules/${process.env.NAME}/index.html`),
    outIndex : path.resolve(__dirname, `../dist/${process.env.NAME}/index.html`),

    // Paths
    assetsRoot: path.resolve(__dirname, `../dist/${process.env.NAME}`),
    assetsSubDirectory: 'static',

    assetsPublicPath: './',
    productionSourceMap: false
  }
}