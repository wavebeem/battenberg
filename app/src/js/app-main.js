'use strict';

const R = require('react').createElement;
const T = require('./translation');
const LogView = require('./log-view');

function AppMain(props) {
  const {settings, logs} = props;
  return R('main', {className: 'AppMain'},
    R(LogView, {settings, logs})
  );
}

module.exports = AppMain;
