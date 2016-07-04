const R = require('react').createElement;

function LintFileLog(props) {
  const {log} = props;
  const warning =
      log.warningCount > 0 ?
      R('div', {}, log.warningCount, ' warning(s)') :
      null;
  const error =
    log.errorCount > 0 ?
    R('div', {}, log.errorCount, ' error(s)') :
    null;
  const title =
    R('div', {}, 'Lint Summary: ', log.file);
  return R('div', {className: 'LogEntry'}, title, warning, error);
}

module.exports = LintFileLog;
