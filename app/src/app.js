'use strict';

require('./app.less');
const R = require('react').createElement;
const AppHeader = require('./app-header');

function App(props) {
  return R('div', {className: 'App'},
    R(AppHeader, {}),
    R('main', {})
  );
}

module.exports = App;
