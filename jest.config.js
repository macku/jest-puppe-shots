const path = require('path');

const root = path.resolve(__dirname);

module.exports = {
  roots: [
    path.resolve(root, 'lib'),
    path.resolve(root, 'tests'),
  ],
};
