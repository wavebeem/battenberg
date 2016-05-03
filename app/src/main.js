'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./app');

const theBattenberg = React.createElement(App, {});
const root = document.getElementById('react-root');

ReactDOM.render(theBattenberg, root);
