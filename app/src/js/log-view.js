'use strict';

const React = require('react');
const R = React.createElement;
const T = require('./translation.json');
const ToolbarButton = require('./toolbar-button');
const LintFileLog = require('./lint-file-log');
const LintFileSpecificLog = require('./lint-file-specific-log');

// const PAGE_SIZE = 600;
const PAGE_SIZE = 100;

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

function fakeLogs(logs) {
  const N = 600;
  if (logs.length === 0) {
    return logs;
  }
  while (logs.length < N) {
    logs = logs.concat(logs);
  }
  return logs.slice(0, N);
}

// This view paginates data into chunks so we don't render too many logs on-
// screen and hurt scrolling performance. I wish web browsers would do this for
// me. Or have some kind of primitive you could use to help with this.

// TODO: Put pagination concerns into a separate stateless module and use it here.

const LogView = React.createClass({
  displayName: 'LogView',
  elem: null,

  getInitialState() {
    return this.stateFromProps(this.props);
  },

  // withElem(fn) {
  //   window.setTimeout(() => {
  //     if (this.elem) {
  //       fn(this.elem);
  //     }
  //   }, 0);
  // },

  goToPrevPage() {
    const i = this.state.index;
    const index = Math.max(0, i - PAGE_SIZE);
    this.setState({index});
    // this.withElem(elem => {
    //   elem.scrollTop = 0;
    // });
  },

  goToNextPage() {
    const logs = this.state.logs;
    const i = this.state.index;
    const index = Math.min(logs.length - PAGE_SIZE, i + PAGE_SIZE);
    this.setState({index});
    // this.withElem(elem => {
    //   elem.scrollTop = elem.scrollHeight;
    // });
  },

  componentWillReceiveProps(props) {
    this.setState(this.stateFromProps(props));
  },

  stateFromProps(props) {
    return {
      index: 0,
      logs: fakeLogs(props.logs)
    };
  },

  render() {
    const props = this.props;
    const i = this.state.index;
    const logs = this.state.logs.slice(i, i + PAGE_SIZE);
    const {settings} = props;

    const prevPage =
      R('button', {
        onClick: () => this.goToPrevPage(),
        className: 'LogViewPaginator'
      }, 'Previous page');

    const nextPage =
      R('button', {
        onClick: () => this.goToNextPage(),
        className: 'LogViewPaginator'
      }, 'Next page');

    const ref = elem => {
      if (elem) {
        setTimeout(() => {
          elem.scrollTop = 0;
        }, 0);
      }
    };

    const theLogs =
      R('div', {className: 'LogViewLogs', ref},
        i > 0 ? prevPage : null,
        logs.map((log, i) => renderLog(settings, log, i)),
        (i + PAGE_SIZE) < (this.state.logs.length - 1) ? nextPage : null
      );

    const theEmpty =
      R('div', {className: 'LogViewNoLogs'}, T.NO_LOGS);

    return R('div', {className: 'LogView'},
      logs.length === 0 ? theEmpty : theLogs
    );
  }
});

module.exports = LogView;
