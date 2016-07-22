const R = require('react').createElement;

function LintFileLog(props) {
  const {log} = props;
  return R('div', {className: 'LogEntry'},
    R('div', {className: 'LogEntryFile'}, log.file)
  );
}

module.exports = LintFileLog;
