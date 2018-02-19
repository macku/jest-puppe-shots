const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

const { closeServer } = require('./server/server');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function () {
  const { __BROWSER__: browser, __SERVER__: server } = global;

  closeServer(server);

  await browser.close();

  rimraf.sync(DIR);
};
