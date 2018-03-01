var reporters = require('jasmine-reporters');

exports.config = {
  allScriptsTimeout: 100000,
  getPageTimeout: 100000,
  directConnect: true,
  capabilities: {
    'browserName': 'chrome',

    chromeOptions: {
      args: ["--headless", "--disable-gpu"]
    }
  },
  framework: 'jasmine2',
  specs: ['./e2e/**/*.e2e-spec.ts'],
  baseUrl: 'http://localhost:8100',
  useAllAngular2AppRoots: true,
  beforeLaunch: function () {

    require('ts-node').register({
      project: 'e2e'
    });

    require('connect')().use(require('serve-static')('www')).listen(8100);

  },
  onPrepare: function () {
    jasmine
      .getEnv()
      .addReporter(new reporters.JUnitXmlReporter({
        'savePath': 'coverage/e2e',
        'filePrefix': 'e2e_output',
        'consolidate': true,
        'consolidateAll': true
      }));
  }
};
