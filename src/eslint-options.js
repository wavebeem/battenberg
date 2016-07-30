// const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

// TODO: Option to write this to `.eslintrc.json`
const options = {
  envs: ['browser', 'mocha', 'node', 'es6'],
  extends: 'eslint:recommended',
  fix: true,
  rules: {
    semi: WARN,
    strict: [WARN, 'safe'],
    'no-undef': ERROR,
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

// TODO: Option to write this to `.eslintignore`
const ignores = [
  'node_modules',
  'bower_components',
  'build',
  'tmp',
  'dist'
].join('\n') + '\n';

exports.eslintrc = options;
exports.eslintignore = ignores;
