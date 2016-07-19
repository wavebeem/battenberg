const path = require('path');
const eslint = require('eslint');

const S = require('../http-statuses');
const eslintOptions = require('../eslint-options');

const cli = new eslint.CLIEngine(eslintOptions);

function lint(req, res) {
  if ('paths' in req.body) {
    const report = cli.executeOnFiles(req.body.paths);
    if (eslintOptions.fix) {
      eslint.CLIEngine.outputFixes(report);
    }
    res.json(report);
  } else {
    res.status(S.BAD_REQUEST).json({
      error: 'Missing parameter "path"'
    });
  }
}

module.exports = lint;
