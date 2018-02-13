const serverPort = 3007; // TODO: Default server port
const serverHost = '0.0.0.0'; // TODO: Default server host
const serverProtocol = 'http'; // TODO: Default server protocol

const getServerUri = () => `${serverProtocol}://${serverHost}:${serverPort}`;

module.exports = {
  getServerUri
};
