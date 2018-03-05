const fs = require('fs');
const path = require('path');
const express = require('express');

const htmlTemplate = fs.readFileSync(path.resolve(__dirname, './templates/server-index.html'), {
  encoding: 'utf8',
});

const serverIndexHtml = (req, res) => {
  res.send(htmlTemplate);
};

async function startServer(port = 3007) {
  const app = express();
  const server = app.listen(port);

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
    server.close();
  });
}

module.exports = {
  startServer,
  mountStaticPath,
  closeServer,
};
