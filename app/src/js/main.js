'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
const createStore = require('redux').createStore;
const SocketIO = require('socket.io-client');

const T = require('./translation');
const backend = require('./backend');
const primaryReducer = require('./primary-reducer');
const App = require('./app');

const initialState = Object.freeze({
  settings: {
    theme: 'light',
    title: 'Untitled'
  },
  loading: false,
  logs: [],
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
const theBattenberg = React.createElement(App, {store});
const theProvider = React.createElement(Provider, {store}, theBattenberg);

// TODO: Maybe wait for these network requests before showing the app?

backend.loadSettings()
  .then(settings => {
    store.dispatch({
      type: 'UPDATE_SETTINGS',
      value: settings
    });
  });

const socket = SocketIO.connect('http://localhost:3200');
socket.on('file-update', data => {
  console.log('SOMETHING CHANGED', data);
  backend.lint([data]).then(value => {
    store.dispatch({
      type: 'DISPLAY_LINT_RESULTS',
      value
    });
  });
});

function start() {
  const root = document.getElementById('react-root');
  ReactDOM.render(theProvider, root);
}

window.addEventListener('DOMContentLoaded', start, false);
