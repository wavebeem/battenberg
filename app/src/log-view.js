'use strict';

require('./log-view.less')
const R = require('react').createElement;
const LintFileLog = require('./lint-file-log');
const LintFileSpecificLog = require('./lint-file-specific-log');

const table = {
  LINT_FILE: LintFileLog,
  LINT_FILE_SPECIFIC: LintFileSpecificLog
};

function renderLog(log, i) {
  if (table.hasOwnProperty(log.type)) {
    return R(table[log.type], {log, key: i})
  }
  console.error('unknown log type:', log);
  return null;
}

function LogView(props) {
  const {logs} = props;
  return R('div', {className: 'LogView'}, logs.map(renderLog));
}

module.exports = LogView;
