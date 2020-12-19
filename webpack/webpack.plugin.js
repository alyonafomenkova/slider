const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const config = {
  mode: 'production',
  entry: ['./src/plugin/plugin.ts'],
  output: {
    path: path.join(__dirname, '../plugin-build'),
    filename: '[name].bundle.js'
  },
};

module.exports = function () {
  return merge([
    common,
    config,
  ]);
};
