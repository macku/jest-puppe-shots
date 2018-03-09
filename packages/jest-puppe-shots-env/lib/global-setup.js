const { join } = require('path');
const { writeFileSync } = require('fs');
const { tmpdir } = require('os');
const puppeteer = require('puppeteer');
const { mkdirpSync } = require('fs-extra');

const DIR = join(tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function globalSetup() {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
  });

  global.__BROWSER__ = browser;

  mkdirpSync(DIR);
  writeFileSync(join(DIR, 'wsEndpoint'), browser.wsEndpoint());

  browser.disconnect();
};
