const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PATHS = {
  source: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
};
const devMode = process.env.NODE_ENV !== 'production';

const common = {
  entry: ['./src/plugin/plugin.ts', './src/demo/demo.ts'],
  output: {
    path: PATHS.dist,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          'pretty': true
        }
      },

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
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      Normalize: path.resolve(__dirname, 'node_modules/normalize.scss/normalize.scss'),
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
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

const devConfig = {
  mode: 'development',
  devServer: {
    index: 'demo.html',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 8000,
    open: 'chrome',
  }
};

module.exports = function (env) {
  if (env === 'production') {
    return common;
  }
  if (env === 'development') {
    return merge([
      common,
      devConfig,
    ]);
  }
};
