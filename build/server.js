// /** 
//  * @author carroll
//  * @description 启动活动页
//  * @param NAME="filename"
//  * @requires NAME="filename" npm run start
// */
// const path = require('path');
// const express = require('express');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const devServer = require('./webpack.dev.js');
// const config = require('../config');
// const compiler = webpack(devServer);
// const fs = require('fs');

// const modulesPath = path.resolve(__dirname, '../src/modules');
// const files = fs.readdirSync(modulesPath);

// // 判断名称必填
// if (!process.env.NAME) {
//   throw new Error('NAME is must, please use "NAME=test npm run init"!');
// }
// // 判断名称是否不存在
// if (!files.includes(process.env.NAME)) {
//   throw new Error('NAME is not exist, please check!');
// }

// const app = new express();
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: path.join(__dirname, '../src')
// }));

// // express.static可以添加多个静态资源目录
// app.use(express.static(path.join(__dirname, '../src')));
// // 添加这个是让所有文件，都相对活动页下的index.html
// app.use(express.static(path.join(__dirname, `../src/modules/${process.env.NAME}`)));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, `../src/modules/${process.env.NAME}/index.html`));
// });

// app.listen(config.dev.port, err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`app is listen in ${config.dev.port}`);
//   }
// });
