'use strict';

require('./app.less');
require('whatwg-fetch');
const R = require('react').createElement;
const connect = require('react-redux').connect;
const AppHeader = require('./app-header');
const AppMain = require('./app-main');
const AppSettings = require('./app-settings');
const primaryReducer = require('./primary-reducer');

function runLint_(folder, store) {
  store.dispatch({
    type: 'UPDATE_LOADING',
    value: true
  })

  // TODO: Escape the folder
  fetch('/lint?path=' + folder)
    .then(resp => resp.json())
    .then(value => {
      store.dispatch({
        type: 'DISPLAY_LINT_RESULTS',
        value
      });
    })
    .then(_ => {
      store.dispatch({
        type: 'UPDATE_LOADING',
        value: false
      })
    });
}

function App(props) {
  const {logs, dispatch, folder, loading, store} = props;
  const runLint = runLint_.bind(null, folder, store);
  const onShowSettings = function() {
    dispatch({type: 'SHOW_SETTINGS'});
  };
  const onHideSettings = function() {
    dispatch({type: 'HIDE_SETTINGS'});
  };
  return R('div', {className: 'App'},
    R(AppHeader, {onShowSettings, folder}),
    R(AppMain, {logs, loading, runLint}),
    R(AppSettings, {isVisible: props.settingsVisible, onHideSettings})
  );
}

const ConnectedApp = connect(primaryReducer)(App);

module.exports = ConnectedApp;
