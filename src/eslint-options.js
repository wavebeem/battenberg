// const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

const options = {
  // TODO: Actually set the envs correctly
  envs: ['browser', 'mocha', 'node', 'es6'],
  useEslintrc: false,
  extends: 'eslint:recommended',
  ignorePattern: [
    'node_modules',
    'bower_components',
    'build',
    'tmp',
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
};

module.exports = options;
