const path = require('path');
const eslint = require('eslint');

const S = require('../http-statuses');

// const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

const cli = new eslint.CLIEngine({
  // TODO: Actually set the envs correctly
  envs: ['browser', 'mocha', 'node', 'es6'],
  useEslintrc: false,
  extends: 'eslint:recommended',
  ignorePattern: [
    'node_modules',
    'bower_components',
    'dist'
  ],
  // Eventually let's enable it to fix problems automatically! :D
  // fix: true,
  rules: {
    semi: WARN,
    strict: [WARN, 'safe'],
    'wrap-iife': WARN,
    'no-trailing-spaces': WARN,
    'comma-style': [WARN, 'last'],
    'new-parens': WARN,
    'no-inline-comments': WARN,
    'no-sequences': ERROR,
    'no-alert': WARN,
    'no-caller': WARN,
    'no-lone-blocks': WARN,
    'object-curly-spacing': [WARN, 'never'],
    'space-infix-ops': WARN,
    'space-unary-ops': [WARN, {words: true, nonwords: false}],
    'spaced-comment': [WARN, 'always'],
    'no-unused-vars': [WARN, {argsIgnorePattern: '^_'}]
  }
});

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
