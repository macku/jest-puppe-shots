const JSDOMEnvironment = require('jest-environment-jsdom');

const { setup, teardown } = require('./jest-puppe-environment');

class PuppeteerJSDOMEnvironment extends JSDOMEnvironment {
  async setup(config) {
    await super.setup(config);
    await setup(config);
  }

  async teardown() {
    await teardown();
    await super.teardown();
  }
}

module.exports = PuppeteerJSDOMEnvironment;
