const R = require('react').createElement;

const backend = require('./backend');

function openUrl(file) {
  return 'javascript:;';
}

function openUrlHandler(editor, file, event) {
  backend.open(editor, file, 1, 1);
  event.preventDefault();
}

function LintFileLog(props) {
  const {settings, log} = props;
  const {editor} = settings;
  const {file} = log;
  const href = openUrl(file);
  const onClick = openUrlHandler.bind(null, editor, file);
  const className = 'LogEntry LogEntryFile';
  return R('a', {href, onClick, className}, file);
}

module.exports = LintFileLog;
