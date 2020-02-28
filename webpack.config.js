'use strict';

const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app :'./ts/index.ts'
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  resolve: { extensions: ['.ts'] },
  plugins: [
    new webpack.IgnorePlugin(/\.\/locale$/)
  ]
};
