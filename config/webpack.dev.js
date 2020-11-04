const fs = require('fs');
const webpack = require('webpack');
const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const { merge } = require('webpack-merge');
const { resolve } = require('./utils');
const base = require('./webpack.base');
const antdTheme = require('../src/antdTheme');

module.exports = () => {
  let devConfig = {
    mode: 'development',
    output: {
      filename: 'js/[name]-[hash:6].js',
      path: resolve('devDist'),
      publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map',
    watch: true,
    devServer: {
      overlay: {
        warnings: true,
        errors: true,
      },
      port: 4000,
      host: '0.0.0.0',
      contentBase: resolve('devDist'),
      historyApiFallback: true, // 解决单页应用刷新404
      hot: true,
      hotOnly: false, // hot失效时刷新页面
      compress: true,  // 启动 gzip 压缩
      // open: true,  // 自动打开浏览器
      // 设置代理
      // proxy: {
      //   // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      //   '/api': 'http://localhost:3000',

      //   // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      //   '/api2': {
      //       target: 'http://localhost:3000',
      //       pathRewrite: {
      //           '/api2': ''
      //       }
      //   }
      // }
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        include: resolve('src'),
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory',
      },{
        test: /\.(css|scss)$/,
        include: resolve('src'),
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
            modules: {
              mode: 'local',
              localIdentName: '[local]__[name]--[hash:base64:5]',
            },
          },
        }, 'postcss-loader', 'sass-loader']
      },{
        test: /\.less$/,
        include: [resolve('node_modules/antd')],
        use: ['style-loader', 'css-loader', 'postcss-loader',{
            loader: 'less-loader',
            options: {
              modifyVars: antdTheme,
              javascriptEnabled: true,
            }
          },
        ],
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new CaseSensitivePlugin(), // 大小写问题
    ]
  }

  // dll
  const files = fs.readdirSync(resolve('dll'));
  files.forEach(item => {
    // AddAssetHtmlWebpackPlugin插入到html
    if (/\.dll\.js/.test(item)) {
      devConfig.plugins.push(
        new AddAssetHtmlWebpackPlugin({
          filepath: resolve(`dll/${item}`)
        }),
      )
    }
    // DllReferencePlugin指向manifest文件
    if (/\.manifest\.json/.test(item)) {
      devConfig.plugins.push(
        new DllReferencePlugin({
          manifest: resolve(`dll/${item}`)
        })
      )
    }
  })

  return merge(base(), devConfig)
}
