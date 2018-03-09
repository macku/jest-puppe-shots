const fs = require('fs');
const path = require('path');
const express = require('express');
const httpShutdown = require('http-shutdown');

const { getServerPort } = require('./config');

const htmlTemplate = fs.readFileSync(path.resolve(__dirname, './templates/server-index.html'), {
  encoding: 'utf8',
});

const serverIndexHtml = (req, res) => {
  res.send(htmlTemplate);
};

async function startServer() {
  const port = await getServerPort();

  const app = express();
  const server = httpShutdown(app.listen(port));

  app.get('/', serverIndexHtml);

  return new Promise((resolve, reject) => {
    server.on('listening', () => {
      resolve({ app, server });
    });

    server.on('error', (err) => {
      reject(err);
    });
  });
}

const mountStaticPath = (appContext, staticPathContext, staticPath) => {
  appContext.use(`/${staticPathContext}`, express.static(staticPath));
};

async function closeServer(server) {
  if (!server) {
    throw new Error('Server was not started');
  }

  return new Promise((resolve) => {
    server.on('close', resolve);

    server.forceShutdown();
  });
}

module.exports = {
  startServer,
  mountStaticPath,
  closeServer,
};
