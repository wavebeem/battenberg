'use strict';

require('./main.less');

const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
const createStore = require('redux').createStore;

const primaryReducer = require('./primary-reducer');
const App = require('./app');

const initialState = Object.freeze({
  logs: [],
  subtitle: '',
  settingsVisible: false,
});

function identity(x) {
  return x;
}

// Enable Redux DevTools if present
function enhancer() {
  if (window.devToolsExtension) {
    return window.devToolsExtension();
  }
  return identity;
}

const store = createStore(primaryReducer, initialState, enhancer());
const theBattenberg = React.createElement(App, {});
const theProvider = React.createElement(Provider, {store}, theBattenberg);

// fetch('something...')

fetch('/cwd')
  .then(resp => resp.json())
  .then(value => {
    store.dispatch({
      type:'UPDATE_SUBTITLE',
      value
    });
  });

fetch('/lint?path=src')
  .then(resp => resp.json())
  .then(value => {
    store.dispatch({
      type: 'DISPLAY_LINT_RESULTS',
      value
    });
  });

function start() {
  const root = document.getElementById('react-root');
  ReactDOM.render(theProvider, root);
}

window.addEventListener('DOMContentLoaded', start, false);
