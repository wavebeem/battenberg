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
    return R(table[log.type], {settings, log, key: i})
  }
  console.error('unknown log type:', log);
  return null;
}

function LogView(props) {
  const {settings, logs} = props;
  const refs = {elem: null};
  const ref = elem => { refs.elem = elem; };
  const scrollToTop = () => {
    if (refs.elem) {
      refs.elem.scrollTop = 0;
    }
  };
  const scrollToBottom = () => {
    if (refs.elem) {
      refs.elem.scrollTop = refs.elem.scrollHeight;
    }
  };
  return R('div', {className: 'LogView'},
    R('div', {ref, className: 'LogViewLogs'},
      logs.map((log, i) => renderLog(settings, log, i))
    ),
    R('div', {className: 'LogViewToolbar'},
      R(ToolbarButton, {
        text: T.TOOLBAR_SCROLL_TO_TOP,
        onClick: scrollToTop
      }),
      R(ToolbarButton, {
        text: T.TOOLBAR_SCROLL_TO_BOTTOM,
        onClick: scrollToBottom
      })
    )
  );
}

module.exports = LogView;
