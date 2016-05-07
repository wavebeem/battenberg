'use strict';

require('./main.less');

const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./app');

function start() {
  const theBattenberg = React.createElement(App, {});
  const root = document.getElementById('react-root');
  ReactDOM.render(theBattenberg, root);
}

window.addEventListener('DOMContentLoaded', start, false);
