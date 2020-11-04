const webpack = require('webpack');
const {resolve} = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const IS_DEV =  process.env.NODE_ENV === 'development';

module.exports = () => {
  return {
    target: 'web',
    entry: {
      app: resolve('src/main.js'),
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        src: resolve('src'),
        pages: resolve('src/pages'),
        static: resolve('src/static'),
        components: resolve('src/components'),
        app: resolve('src/app'),
        language: resolve('src/language'),
        interface: resolve('src/interface'),
        rstore: resolve('src/store'),
        mock: resolve('src/mock'),
      },
    },
    module: {
      // noParse: [/react\.min\.js$/],
      rules: [{
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:6].[ext]',
            limit: 4028,
            outputPath: 'imgs/',
            // publicPath: `/imgs`
          }
        }]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]-[hash:6].[ext]',
            outputPath: 'fonts/',
            // publicPath: `/fonts`
          }
        }]
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'joya login',
        template: resolve( 'config/template/index.html'),
        // favicon: resolve( 'config/template/favicon.ico'),
        // chunks: ['vendor', 'common', 'app'],
      }),
      new webpack.DefinePlugin({
        IS_DEV: true,
      }),
      new CleanWebpackPlugin({
        verbose: true,
      }),
    ],
  }
}

