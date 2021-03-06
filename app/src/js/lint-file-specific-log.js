const R = require('react').createElement;

const backend = require('./backend');

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
  return 'javascript:;';
}

function openUrlHandler(editor, file, line, column, event) {
  backend.open(editor, file, line, column);
  event.preventDefault();
}

function LintFileSpecificLog(props) {
  const {settings, log, border} = props;
  const {editor} = settings;
  const {
    file,
    line,
    column,
    // severity,
    ruleId,
    message,
    source
  } = log;
  const formattedMessage = message.replace(/[.]$/, '');
  return R('div', {className: 'LogEntry LogEntryFileSpecific'},
    R('div', {className: 'LintMessage'}, formattedMessage),
    R('table', {className: 'Metadata'},
      R('tbody', {},
        R('tr', {},
          R('th', {}, 'file'),
          R('td', {},
            R('a',
              {
                href: 'javascript:;',
                onClick: openUrlHandler.bind(null, editor, file, line, column)
              },
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
