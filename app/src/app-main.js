'use strict';

require('./app-main.less');
const R = require('react').createElement;
const T = require('./translation.json');
const LogView = require('./log-view');

function AppMain(props) {
  const {logs} = props;
  return R('main', {className: 'AppMain'},
    R('div', {className: 'MainActionBar'}, 'Main Actions'),
    R(LogView, {logs}),
    R('div', {className: 'SecondaryActionBar'}, 'Secondary Actions')
  );
}

module.exports = AppMain;
