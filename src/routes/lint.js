const path = require('path');
const eslint = require('eslint');

const S = require('../http-statuses');

const cli = new eslint.CLIEngine({});

function lint(req, res) {
  if ('paths' in req.body) {
    const report = cli.executeOnFiles(req.body.paths);
    // I think it's safe to just unconditionally run this, and if they enabled
    // `fix: true` in their eslintrc then we'll actually do the fixes, otherwise
    // this will just waste some time with no other side effects.
    eslint.CLIEngine.outputFixes(report);
    res.json(report);
  } else {
    res.status(S.BAD_REQUEST).json({
      error: 'Missing parameter "path"'
    });
  }
}

module.exports = lint;
