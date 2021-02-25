const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const logger = require('webpack-log')({ name: 'webpack-logger' })
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NOMOCK !== 'true'

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: '@/index.js',
  output: {
    path: resolve(__dirname, '/dist'),
    filename: 'app.js'
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@api-mock': isDevelopment ? resolve('./src/api-mock') : resolve('./src/empty'),
      'axios-mock-adapter': isDevelopment ? 'axios-mock-adapter/dist/axios-mock-adapter.min.js' : resolve('./src/empty')
    },
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.module\.s[a|c]ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ]
}