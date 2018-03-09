const gerPort = require('get-port');

const serverHost = '0.0.0.0';
const serverProtocol = 'http';

let serverPort = 3007;

async function getServerPort() {
  serverPort = await gerPort(serverPort);

  return serverPort;
}

const getServerUri = () => `${serverProtocol}://${serverHost}:${serverPort}`;

module.exports = {
  getServerUri,
  getServerPort,
};
