'use strict';

require('./log-view.less')
const R = require('react').createElement;
const ToolbarButton = require('./toolbar-button');
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
  let elem = null;
  const ref = ref => { elem = ref; };
  const scrollToTop = () => {
    if (elem) {
      elem.scrollTop = 0;
    }
  };
  const scrollToBottom = () => {
    if (elem) {
      elem.scrollTop = elem.scrollHeight;
    }
  };
  return R('div', {className: 'LogView'},
    R('div', {ref, className: 'LogViewLogs'}, logs.map(renderLog)),
    R('div', {className: 'LogViewToolbar'},
      R(ToolbarButton, {text: 'Top', onClick: scrollToTop}),
      R(ToolbarButton, {text: 'Bottom', onClick: scrollToBottom})
    )
  );
}

module.exports = LogView;
