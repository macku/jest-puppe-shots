const { toMatchImageSnapshot } = require('jest-image-snapshot');
const Page = require('./lib/page-mount-api');

global.expect.extend({ toMatchImageSnapshot });

module.exports = {
  Page,
  openNewPage: Page.openNewPage,
};
