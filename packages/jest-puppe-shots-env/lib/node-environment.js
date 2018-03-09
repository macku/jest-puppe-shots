const NodeEnvironment = require('jest-environment-node');

const { setup, teardown } = require('./jest-puppe-environment');

class PuppeteerNodeEnvironment extends NodeEnvironment {
  async setup(config) {
    await super.setup(config);
    await setup(config);
  }

  async teardown() {
    await teardown();
    await super.teardown();
  }
}

module.exports = PuppeteerNodeEnvironment;
