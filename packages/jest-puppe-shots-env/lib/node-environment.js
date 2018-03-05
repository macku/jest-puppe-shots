const { join } = require('path');
const { readFileSync } = require('fs');
const { tmpdir } = require('os');

const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');

const DIR = join(tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerNodeEnvironment extends NodeEnvironment {
  async setup(config) {
    await super.setup(config);

    const wsEndpoint = readFileSync(join(DIR, 'wsEndpoint'), 'utf8');


    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    // TODO: this can be borrowed from `global.__BROWSER__`
    const browser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });

    const { __APP_SERVER__, __SERVER__ } = global;

    Object.assign(this.global, {
      __APP_SERVER__,
      __SERVER__,
      browser,
    });
  }
}

module.exports = PuppeteerNodeEnvironment;
