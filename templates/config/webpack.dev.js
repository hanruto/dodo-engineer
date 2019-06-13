const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const baseConfig = require('./webpack.common')

module.exports = merge(baseConfig, {
  entry: ['@babel/polyfill', 'react-hot-loader/patch', './src/index'],
  output: {
    filename: 'mian.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    port: 2020,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../'),
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
})
