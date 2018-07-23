/**
 * @author carroll
 * @since 20180719
 * @example NAME="filename" npm run init
 * @description 初始化活动文件
*/

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');

const modulesPath = path.resolve(__dirname, '../src/modules');
const files = fs.readdirSync(modulesPath);

// 判断名称必填
if (!process.env.NAME) {
  throw new Error('NAME is must, please use "NAME=test npm run init"!');
}
// 判断名称是否已存在
for (let item of files) {
  if (process.env.NAME === item) {
    console.log(item);
    throw new Error('NAME is exist, please check!');
  }
}

const initWebpackConfig = {
  entry: {
    app: path.resolve(__dirname, `../src/main.js`),
  },
  output: {
    path: path.resolve(__dirname, `../src/common/js`),
    filename: '[name].js',
  },
  plugins: [
    //  拷贝template下的文件到modules下新生成的活动模块
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/template'),
        to: path.resolve(__dirname, `../src/modules/${process.env.NAME}`),
      },
    ]),
  ],
};
module.exports = initWebpackConfig;