const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './app.js',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: [
          'babel-preset-env',
          'babel-preset-react'
        ]
      }
    }]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'app.js',
    path: __dirname + '/dist'
  }
};