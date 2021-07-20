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
    filename: 'app.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@UI': resolve('./src/components/UI'),
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
        test: /\.(png|jpg|gif|svg)$/i,
        use: ['url-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
              additionalData: '@import "~@/assets/scss/main.scss";'
            }
          }
        ]
      },
      {
        test: /\.css/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
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