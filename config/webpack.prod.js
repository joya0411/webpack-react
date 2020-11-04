const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const threadLoader = require('thread-loader'); // 多进程
const TerserPlugin = require('terser-webpack-plugin');
const { resolve } = require('./utils');
const base = require('./webpack.base');
const antdTheme = require('../src/antdTheme');


// const workerPoolJs = {
//   workers: 2,
//   poolTimeout: 2000,
// }

// const workerPoolSass = {
//   workers: 2,
//   poolTimeout: 2000,
// }

// threadLoader.warmup(workerPoolJs, ['babel-loader'])
// threadLoader.warmup(workerPoolSass, ['sass-loader', 'postcss-loader', 'css-loader'])

module.exports = () => {
  let buildConfig = {
    mode: 'production',
    output: {
      filename: 'js/[name]-[chunkhash:6].js',
      path: resolve('dist'),
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        include: resolve('src'),
        use: [
        // {
        //   loader: 'thread-loader',
        //   options: workerPoolJs,
        // },
        'babel-loader?cacheDirectory'],
      },{
        test: /\.(css|scss)$/,
        include: resolve('src'),
        use: [MiniCssExtractPlugin.loader,
        // {
        //   loader: 'thread-loader',
        //   options: workerPoolSass,
        // },
        {
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
        use: [MiniCssExtractPlugin.loader,'css-loader', 'postcss-loader',{
            loader: 'less-loader',
            options: {
              modifyVars: antdTheme,
              javascriptEnabled: true,
            }
          },
        ],
      }]
    },
    optimization: {
      // concatenateModules: true, // 默认已开启Scope Hosting
      minimize: true,
      minimizer: [new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          unused: true, // 删除无用代码,
          drop_debugger: true, //删掉debugger
          drop_console: true, // 删除console.log
          dead_code: true, // 删除无法到达代码
        }
      })],
      splitChunks: {
        /**
         * initial 入口 chunk，对于异步导入的文件不处理
            async 异步 chunk，只对异步导入的文件处理
            all 全部 chunk
         */
        chunks: 'all',

        // 缓存分组
        cacheGroups: {
            // 第三方模块
            vendor: {
                name: 'vendor', // chunk 名称
                priority: 1, // 权限更高，优先抽离，重要！！！
                test: /node_modules/,
                minSize: 0,  // 大小限制
                minChunks: 1  // 最少复用过几次
            },
            // 公共的模块
            // common: {
            //     name: 'common', // chunk 名称
            //     priority: 0, // 优先级
            //     minSize: 0,  // 公共模块的大小限制
            //     minChunks: 2  // 公共模块最少复用过几次
            // }
        }
      }
    },
    plugins: [
      new OptimizeCSSAssetsPlugin({ // 样式压缩
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[contenthash:6].css',
      }),
      new CompressionWebpackPlugin({ // 生成gz包
        test: /\.(css|js)$/,
      }),
      new webpack.HashedModuleIdsPlugin(), // 防止解析顺序变化引起公用库重复编译
      new webpack.ContextReplacementPlugin( // 优化打包,moment只允许打包指定的语言包
        /moment[/\\]locale$/,
        /en|zh/
      ),
      new CopyPlugin({
        patterns: [
          { from: resolve('config/template/browser.html'), to: resolve('dist') },
        ],
      }),
      // new BundleAnalyzerPlugin({
      //   openAnalyzer: true,
      // })
    ]
  }

  //可以将react和react-dom添加进externals中，然后在html模板中引入它们的外部链接,如CDN:
  // buildConfig.externals = {
  //   'react': 'window.React',
  //   'react-dom': 'window.ReactDOM'
  // }

  return merge(base(), buildConfig)
}
