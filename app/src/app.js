'use strict';

require('./app.less');
const R = require('react').createElement;
const AppHeader = require('./app-header');
const AppMain = require('./app-main');

function App(props) {
  return R('div', {className: 'App'},
    R(AppHeader, {}),
    R(AppMain, {})
  );
}

module.exports = App;
