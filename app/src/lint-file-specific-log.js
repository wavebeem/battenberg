require('./lint-file-specific-log.less');
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
    R('pre', {class: 'LintFileName'}, file, ' (line ', line, ')'),
    R('div', {className: 'LintMessage'}, message),
    R('pre', {className: 'SourceCodeContext'},
      source,
      '\n',
      R('span', {className: 'Arrow'}, arrow(column))
    )
  );
}

module.exports = LintFileSpecificLog;
