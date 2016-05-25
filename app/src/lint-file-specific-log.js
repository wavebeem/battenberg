const R = require('react').createElement;

function arrow(n) {
  let s = '';
  while (n-- > 1) {
    s += '─'
  }
  s += '┘';
  return s;
}

function LintFileSpecificLog(props) {
  const {log} = props;
  const {
    file,
    line,
    column,
    // severity,
    // ruleId,
    message,
    source
  } = log;
  return R('div', {className: 'LogEntry'},
    R('pre', {}, file, ' (', line, ':', column, ')'),
    R('div', {}, message),
    R('pre', {},
      source,
      '\n',
      R('span', {className: 'Arrow'}, arrow(column))
    )
  );
}

module.exports = LintFileSpecificLog;
