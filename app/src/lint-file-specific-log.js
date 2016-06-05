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

function ruleUrl(ruleId) {
  return 'http://eslint.org/docs/rules/' + ruleId;
}

function openUrl(file, line, column) {
  return '/open?file=' + [file, line, column].join(':');
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
          R('td', {},
            R('a', {target: '_blank', href: openUrl(file, line, column)},
              file, ':', line, ':', column
            )
          )
        ),
        R('tr', {},
          R('th', {}, 'eslint'),
          R('td', {},
            R('a', {target: '_blank', href: ruleUrl(ruleId)},
              ruleId
            )
          )
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
