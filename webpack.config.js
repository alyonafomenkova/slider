const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'development',
  entry: ['./src/plugin/plugin.ts', './src/demo/demo.ts'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    index: 'demo.html',
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },

      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
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

      {
        enforce: 'post',
        exclude: /(node_modules|\.Test\.[tj]sx?$)/,
        test: /\.[tj]s$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {esModules: true}
        },
      }
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
        { from: 'src/assets/favicons', to: 'assets/favicons' },
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
  ]
};

module.exports = config;
