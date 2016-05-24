const path = require('path');

const C = require('../constants');

function index(req, res) {
  res.sendFile(path.join(C.APP_PATH, 'dist', 'index.html'));
}

module.exports = index;
