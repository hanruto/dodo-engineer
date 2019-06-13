const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

const DOMAIN_ENV = process.env.DOMAIN_ENV
const NODE_ENV = process.env.NODE_ENV

const globalConfig = Object.assign(
  { DOMAIN_ENV, NODE_ENV },
  dotenv.config().parsed
)

for (const key in globalConfig) {
  globalConfig[key] = JSON.stringify(globalConfig[key])
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: [
          { loader: 'babel-loader', options: { cacheDirectory: true } },
          { loader: 'eslint-loader', options: { fix: true } },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|eot|woff|woff2)(\?t=\d+)?$/,
        use: ['url-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      publicPath: '/',
      template: './src/index.html',
      favicon: './src/static/favicon.ico',
      title: 'yang',
    }),
    new webpack.DefinePlugin(globalConfig),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
}
