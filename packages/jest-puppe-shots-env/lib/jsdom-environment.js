const JSDOMEnvironment = require('jest-environment-jsdom');

const { setup, teardown } = require('./jest-puppe-environment');

class PuppeteerJSDOMEnvironment extends JSDOMEnvironment {
  async setup(config) {
    await super.setup(config);
    await setup.call(this, config);
  }

  async teardown() {
    await teardown.call(this);
    await super.teardown();
  }
}

module.exports = PuppeteerJSDOMEnvironment;
