'use strict';

require('./app.less');
require('whatwg-fetch');

const R = require('react').createElement;
const connect = require('react-redux').connect;

const AppHeader = require('./app-header');
const AppMain = require('./app-main');
const AppSettings = require('./app-settings');
const primaryReducer = require('./primary-reducer');
const css = require('./css');

function updateSettings_(store, settings) {
  store.dispatch({
    type: 'UPDATE_SETTINGS',
    value: settings
  });
}

function runLint_(store, folder) {
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
  const {
    settings,
    logs,
    dispatch,
    loading,
    store,
    settingsVisible
  } = props;
  const {title, folder, theme} = settings;
  const runLint = runLint_.bind(null, store, folder);
  const updateSettings = updateSettings_.bind(null, store);
  const onShowSettings = function() {
    dispatch({type: 'SHOW_SETTINGS'});
  };
  const onHideSettings = function() {
    dispatch({type: 'HIDE_SETTINGS'});
  };
  const className = css({
    App: true,
    ThemeDark: theme === 'dark',
    ThemeLight: theme === 'light' || !theme,
  });
  return R('div', {className},
    R(AppHeader, {onShowSettings, title}),
    R(AppMain, {logs, loading, runLint}),
    R(AppSettings, {
      isVisible: settingsVisible,
      settings,
      onHideSettings,
      updateSettings
    })
  );
}

const ConnectedApp = connect(primaryReducer)(App);

module.exports = ConnectedApp;
