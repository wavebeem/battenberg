'use strict';

const React = require('react');
const R = React.createElement;
const T = require('./translation.json');
const ToolbarButton = require('./toolbar-button');
const LintFileLog = require('./lint-file-log');
const LintFileSpecificLog = require('./lint-file-specific-log');
const Paginator = require('./paginator');

const PAGE_SIZE = 500;

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

// This view paginates data into chunks so we don't render too many logs on-
// screen and hurt scrolling performance. I wish web browsers would do this for
// me. Or have some kind of primitive you could use to help with this.
const LogView = React.createClass({
  displayName: 'LogView',

  getInitialState() {
    return this.stateFromProps(this.props);
  },

  goToPrevPage() {
    this.state.paginator.goToPrevPage();
    this.setState({
      isOnLastPage: this.state.paginator.isOnLastPage(),
      isOnFirstPage: this.state.paginator.isOnFirstPage(),
      currentPageData: this.state.paginator.currentPageData()
    });
  },

  goToNextPage() {
    this.state.paginator.goToNextPage();
    this.setState({
      isOnLastPage: this.state.paginator.isOnLastPage(),
      isOnFirstPage: this.state.paginator.isOnFirstPage(),
      currentPageData: this.state.paginator.currentPageData()
    });
  },

  componentWillReceiveProps(props) {
    this.setState(this.stateFromProps(props));
  },

  stateFromProps(props) {
    const logs = props.logs;
    const paginator = Paginator(PAGE_SIZE, 1, logs);
    return {
      logs,
      paginator,
      isOnLastPage: paginator.isOnLastPage(),
      isOnFirstPage: paginator.isOnFirstPage(),
      currentPageData: paginator.currentPageData()
    };
  },

  render() {
    const {settings} = this.props;
    const logs = this.state.currentPageData;

    const prevPage =
      R('button', {
        onClick: () => this.goToPrevPage(),
        className: 'LogViewPaginator'
      }, T.PREV_PAGE);

    const nextPage =
      R('button', {
        onClick: () => this.goToNextPage(),
        className: 'LogViewPaginator'
      }, T.NEXT_PAGE);

    const ref = elem => {
      if (elem) {
        setTimeout(() => {
          elem.scrollTop = 0;
        }, 0);
      }
    };

    const theLogs =
      R('div', {className: 'LogViewLogs', ref},
        this.state.isOnFirstPage ? null : prevPage,
        logs.map((log, i) => renderLog(settings, log, i)),
        this.state.isOnLastPage ? null : nextPage
      );

    const theEmpty =
      R('div', {className: 'LogViewNoLogs'}, T.NO_LOGS);

    return R('div', {className: 'LogView'},
      logs.length === 0 ? theEmpty : theLogs
    );
  }
});

module.exports = LogView;
