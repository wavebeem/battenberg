const fs = require('fs');

const C = require('../constants');
const S = require('../http-statuses');

function load(req, res) {
  try {
    const text = fs.readFileSync(C.FILENAME, 'UTF-8');
    res.send(JSON.parse(text));
  } catch (err) {
    res.status(S.NOT_FOUND).send({
      error: 'battenberg: error parsing settings file'
    });
  }
}

module.exports = load;
