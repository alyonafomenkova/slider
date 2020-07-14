const testCode = 'src/**/*Test.ts';
const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: '',
    autoWatch: true,
    browsers: ['Chrome'],
    colors: true,
    concurrency: Infinity,
    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      reports: ['html']
    },
    exclude: [],
    files: [
      {pattern: testCode, watched: false}
    ],
    frameworks: ['jasmine'],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      [testCode]: ['webpack']
    },
    reporters: ['progress', 'coverage-istanbul'],
    webpack: webpackConfig,
    client: {
      jasmine: {
        random: false
      }
    }
  });
};
