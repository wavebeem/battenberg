const fs = require('fs');

const C = require('../constants');
const S = require('../http-statuses');

function save(req, res) {
  const settings = req.body;
  const json = JSON.stringify(settings, null, 2);
  try {
    fs.writeFileSync(C.FILENAME, json);
    res.send(true);
  } catch (err) {
    res.status(S.INTERNAL_ERROR).send(false);
  }
}

module.exports = save;
