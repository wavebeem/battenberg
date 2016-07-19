'use strict';

const R = require('react').createElement;
const T = require('./translation.json');
const LogView = require('./log-view');
const MainActionBar = require('./main-action-bar');

function AppMain(props) {
  const {settings, logs, loading, runLint} = props;
  return R('main', {className: 'AppMain'},
    R(MainActionBar, {loading, runLint}),
    R(LogView, {settings, logs})
  );
}

module.exports = AppMain;