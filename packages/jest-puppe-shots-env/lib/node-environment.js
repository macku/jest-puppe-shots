const { join } = require('path');
const { readFileSync } = require('fs');
const { tmpdir } = require('os');

const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');

const { startServer, closeServer } = require('./server/server');

const DIR = join(tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerNodeEnvironment extends NodeEnvironment {
  async setup(config) {
    await super.setup(config);

    const wsEndpoint = readFileSync(join(DIR, 'wsEndpoint'), 'utf8');

    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }

    const browser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });

    const { app, server } = await startServer();

    Object.assign(this.global, {
      __APP_SERVER__: app,
      __SERVER__: server,
      __BROWSER__: browser,
    });
  }

  async teardown() {
    const { __SERVER__: server } = this.global;

    await closeServer(server);

    await super.teardown();
  }
}

module.exports = PuppeteerNodeEnvironment;
