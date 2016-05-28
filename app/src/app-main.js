'use strict';

require('./app-main.less');
const R = require('react').createElement;
const T = require('./translation.json');
const LogView = require('./log-view');
const MainActionBar = require('./main-action-bar');

function AppMain(props) {
  const {logs, loading} = props;
  return R('main', {className: 'AppMain'},
    R(MainActionBar, {loading}),
    R(LogView, {logs}),
    R('div', {className: 'SecondaryActionBar'}, 'Secondary Actions')
  );
}

module.exports = AppMain;
