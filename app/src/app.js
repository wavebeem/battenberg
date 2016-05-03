'use strict';

require('./app.less');
const R = require('react').createElement;

function App(props) {
  return R('div', {className: 'App'}, 'Sup?!');
}

module.exports  App;
