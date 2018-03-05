const serverPort = 3007;
const serverHost = '0.0.0.0';
const serverProtocol = 'http';

const getServerUri = () => `${serverProtocol}://${serverHost}:${serverPort}`;

module.exports = {
  getServerUri,
};
