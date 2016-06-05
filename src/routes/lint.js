const path = require('path');
const eslint = require('eslint');

const S = require('../http-statuses');
const eslintOptions = require('../eslint-options');

const cli = new eslint.CLIEngine(eslintOptions);

function lint(req, res) {
  if ('path' in req.query) {
    const file = req.query.path;
    const files = [file];
    const report = cli.executeOnFiles(files);
    res.json(report);
  } else {
    res.status(S.BAD_REQUEST).json({
      error: 'Missing query string parameter "path"'
    });
  }
}

module.exports = lint;
