var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd
module.exports = {
  //入口文件配置，这里是多入口写法，键值（此例为'app'）将作为代表该入口文件的名字
  //如果用了多入口写法，那么必须在output中重写filename字段，不然的话所有的入口文件都将写入同一个出口文件
  //利用[name]可以获取入口文件的名字
  entry: {
    app: './public/src/main.js'
  },
  //出口文件配置，path不用多说，打包文件输出路径
  //publicPath，公共文件下的路径，举个例子，比如你用express启动了一个服务，并将静态资源目录设置为了public
  //你打包的文件输出路径在public下，比如 /public/dist/xxx
  //那么这个时候需要设置publicPath为'/dist/',说的简单一点 publicPath = path（打包文件总路径） - serverStaticPath（服务器设置静态资源路径）
  //filename在入口设置处已经讲解
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    //指明程序自动补全识别哪些后缀
    extensions: ['', '.js', '.vue', '.json'],
    //fallback的值为目录，指明webpack寻找模块的地方（当resolve.root和resolve.mudulesDirecories找不到时）
    fallback: [path.join(__dirname, '../node_modules')],
    //别名，替换一些模块为别的模块或者路径
    //https://webpack.github.io/docs/configuration.html#resolve
    alias: {
      //eg:当import Vue from 'vue',实际上为 import Vue from '/projectdir/node_modules/vue/dist/vue/vue.common.js'
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../public/src'),
      'assets': path.resolve(__dirname, '../public/src/assets'),
      'components': path.resolve(__dirname, '../public/src/components')
    }
  },
  //如果说resolve是为webpack打包过程中提供模块的一些约定的话
  //那resolveLoader就是为loader提供的一些约定
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  //module选项的一些配置将影响每一个普通的模块
  //module.preLoaders和loaders的语法是一样的
  //https://webpack.github.io/docs/configuration.html#module
  module: {
    preLoaders: [
      // {
      //   test: /\.vue$/,
      //   loader: 'eslint',
      //   include: [
      //     path.join(projectRoot, 'public/src')
      //   ],
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      //   include: [
      //     path.join(projectRoot, 'public/src')
      //   ],
      //   exclude: /node_modules/
      // }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'public/src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      //url-loader,工作方式类似file-loader,当文件大小小于限制值（这个地方为10kb）时，返回一个dataurl
      //否则就以hash方式命名并拼接路径
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  //eslint配置
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
