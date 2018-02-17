var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  allScriptsTimeout: 100000,
  getPageTimeout: 100000,
  directConnect: true,
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
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
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
