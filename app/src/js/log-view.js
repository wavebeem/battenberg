'use strict';

const R = require('react').createElement;
const T = require('./translation.json');
const ToolbarButton = require('./toolbar-button');
const LintFileLog = require('./lint-file-log');
const LintFileSpecificLog = require('./lint-file-specific-log');

const table = {
  LINT_FILE: LintFileLog,
  LINT_FILE_SPECIFIC: LintFileSpecificLog
};

function renderLog(settings, log, i) {
  if (table.hasOwnProperty(log.type)) {
    const props = {
      settings,
      log,
      border: i > 0,
      key: i
    };
    return R(table[log.type], props);
  }
  console.error('unknown log type:', log);
  return null;
}

function LogView(props) {
  const {settings, logs} = props;

  const theLogs =
    R('div', {className: 'LogViewLogs'},
      logs.map((log, i) => renderLog(settings, log, i))
    );

  const theEmpty =
    R('div', {className: 'LogViewNoLogs'}, T.NO_LOGS);

  return R('div', {className: 'LogView'},
    logs.length === 0 ? theEmpty : theLogs
  );
}

module.exports = LogView;
