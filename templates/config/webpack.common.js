const HtmlWebpackPlugin = require('html-webpack-plugin')

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
      template: './public/index.html',
      favicon: './public/favicon.ico',
      title: '{{{appName}}}',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
}
