const Chokidar = require('chokidar');

const opts = {ignored: /node_modules|bower_components/};

function watcher(callback) {
  const fn = path => callback(path);
  // TODO: Be more selective about what we're watching.
  Chokidar.watch('src', opts).on('add', fn).on('change', fn);
}

module.exports = watcher;
