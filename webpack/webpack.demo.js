const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const demo = {
  entry: ['./src/plugin/plugin.ts', './src/demo/demo.ts'],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        },
        exclude: [/fonts/],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      template: './src/demo/demo.pug',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ],
};

const devDemo = {
  mode: 'development',
  devServer: {
    index: 'demo.html',
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    hot: true,
    port: 8000,
    open: 'chrome',
  }
};

module.exports = function (env) {
  if (env === 'production') {
    return merge([
      common,
      demo,
    ]);
  }
  if (env === 'development') {
    return merge([
      common,
      demo,
      devDemo
    ]);
  }
};
