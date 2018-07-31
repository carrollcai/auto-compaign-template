const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getModuleHtml() {
  const modulePath = path.resolve(__dirname, `../src/modules/${process.env.NAME}`);
  const moduleHtmlFile = fs.readdirSync(modulePath).filter(val => val.endsWith('.html'));
  return moduleHtmlFile;
}

exports.setHtmlWebpackPlugin = function () {
  const moduleHtmlFile = getModuleHtml();
  const htmlFiles = moduleHtmlFile.map(val => {
    return path.resolve(__dirname, `../src/modules/${process.env.NAME}/${val}`);
  });;
  if (process.env.NODE_ENV === 'production') {
    return moduleHtmlFile.map(val => {
      return new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, `../dist/${process.env.NAME}/${val}`),
        template: path.resolve(__dirname, `../src/modules/${process.env.NAME}/${val}`),
        inject: 'body',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      });
    });
  } else {
    return htmlFiles.map(val => {
      return new HtmlWebpackPlugin({
        filename: val,
        template: val,
        inject: 'body'
      })
    });
  }
};
