var webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {pattern: './karma-shim.js', watched: true}
    ],

    preprocessors: {
      './karma-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true
    },

    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'cobertura'],
      fixWebpackSourcePaths: true,
    },

    junitReporter: {
      outputFile: 'test-results.xml',
    },

    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 50000,

    reporters: config.coverage ? ['kjhtml', 'dots', 'coverage-istanbul', 'verbose', 'junit'] : ['kjhtml', 'dots', 'verbose'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'ChromeHeadless_custom'],
    customLaunchers: {
      'ChromeHeadless_custom': {
        base: 'ChromeHeadless',
        flags: [
          // We must disable the Chrome sandbox when running Chrome inside Docker (Chrome's sandbox needs
          // more permissions than Docker allows by default)
          // Also: https://github.com/GoogleChrome/puppeteer/issues/560
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
      },
    },
    singleRun: false
  };

  config.set(_config);
};
