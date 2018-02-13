const { join } = require('path');
const { writeFileSync } = require('fs');
const { tmpdir } = require('os');
const puppeteer = require('puppeteer');
const { mkdirpSync } = require('fs-extra');

const { startServer } = require('./server/server');

const DIR = join(tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function() {
  const { app, server } = await startServer();

  const browser = await puppeteer.launch({
    headless: true, // TODO: Allow to configure it
    devtools: false, // TODO: Allow to configure it
  });

  global.__BROWSER__ = browser;
  global.__APP_SERVER__ = app;
  global.__SERVER__ = server;

  mkdirpSync(DIR);
  writeFileSync(join(DIR, 'wsEndpoint'), browser.wsEndpoint());

  browser.disconnect();
};
