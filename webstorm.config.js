const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  context: path.join(__dirname, './'),
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': resolve(path.join(__dirname, '')),
      $s: resolve(path.join(__dirname, 'server'))
    }
  }
};
