const server = require('./server/server');
const { getServerUri } = require('./server/config');

module.exports = {
  server,
  getServerUri,
};
