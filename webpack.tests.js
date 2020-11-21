const config = {
  mode: 'development',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },

      {
        enforce: 'post',
        exclude: /(node_modules|\.*Test\.[tj]sx?$)/,
        test: /\.[tj]s$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

module.exports = config;
