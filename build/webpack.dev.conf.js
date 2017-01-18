var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionWebpackPlugin = require('compression-webpack-plugin');

var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrors = require('friendly-errors-webpack-plugin')
// var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
// Object.keys(baseWebpackConfig.entry).forEach(function (name) {
//   baseWebpackConfig.entry[name] = [baseWebpackConfig.entry[name]].concat(hotMiddlewareScript)
// })
// console.log('baseWpc',baseWebpackConfig)
module.exports = merge(baseWebpackConfig, {
  module: {
    // loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  // devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    //在 plugins 中添加
    // new webpack.optimize.UglifyJsPlugin({
    //     comments: false,        //去掉注释
    //     compress: {
    //         warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
    //     }
    // }),
    // new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    //在 plugin 中添加
    // new CompressionWebpackPlugin({ //gzip 压缩
    //     asset: '[path].gz[query]',
    //     algorithm: 'gzip',
    //     test: new RegExp(
    //         '\\.(js|css)$'    //压缩 js 与 css
    //     ),
    //     threshold: 10240,
    //     minRatio: 0.8
    // }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrors()
  ]
})
