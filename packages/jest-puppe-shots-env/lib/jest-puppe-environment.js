const { join } = require('path');
const { readFileSync } = require('fs');
const { tmpdir } = require('os');

const puppeteer = require('puppeteer');

const { startServer, closeServer } = require('./server/server');

const DIR = join(tmpdir(), 'jest_puppeteer_global_setup');

async function setup() {
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

async function teardown() {
  const { __SERVER__: server } = this.global;

  await closeServer(server);
}

module.exports = {
  setup,
  teardown,
};
