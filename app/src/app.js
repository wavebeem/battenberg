'use strict';

require('./app.less');
const R = require('react').createElement;

function App(props) {
  return R('div', {className: 'App'},
    R('header', {className: 'AppHeader'}, 'Battenberg'),
    R('main', {})
  );
}

module.exports = App;
