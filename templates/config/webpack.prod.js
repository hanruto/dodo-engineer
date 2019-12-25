const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.common')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
  entry: ['@babel/polyfill', './src/index'],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].[contenthash].js',
    pathinfo: false,
    publicPath: '/',
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
})
