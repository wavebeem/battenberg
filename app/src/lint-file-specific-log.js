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
    ruleId,
    message,
    source
  } = log;
  return R('div', {className: 'LogEntry'},
    R('div', {className: 'LintMessage'}, message),
    R('table', {className: 'Metadata'},
      R('tbody', {},
        R('tr', {},
          R('th', {}, 'file'),
          R('td', {}, file)
        ),
        R('tr', {},
          R('th', {}, 'line'),
          R('td', {}, line)
        ),
        R('tr', {},
          R('th', {}, 'eslint'),
          R('td', {}, ruleId)
        )
      )
    ),
    R('pre', {className: 'SourceCodeContext'},
      source, '\n',
      R('span', {className: 'Arrow'}, arrow(column))
    )
  );
}

module.exports = LintFileSpecificLog;
