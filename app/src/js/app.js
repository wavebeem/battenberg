'use strict';

require('whatwg-fetch');

const R = require('react').createElement;
const connect = require('react-redux').connect;

const backend = require('./backend');
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

  backend.lint([folder])
    .then(value => {
      store.dispatch({
        type: 'DISPLAY_LINT_RESULTS',
        value
      });
      store.dispatch({
        type: 'UPDATE_LOADING',
        value: false
      })
    })
}

function App(props) {
  const {
    settings,
    logs,
    folder,
    dispatch,
    loading,
    store,
    settingsVisible
  } = props;
  const {title, theme} = settings;
  const runLint = runLint_.bind(null, store, folder);
  const updateSettings = updateSettings_.bind(null, store);
  const onShowSettings = () => { dispatch({type: 'SHOW_SETTINGS'}); };
  const onHideSettings = () => { dispatch({type: 'HIDE_SETTINGS'}); };
  const className = css({
    App: true,
    ThemeDark: theme === 'dark',
    ThemeLight: theme === 'light' || !theme,
  });
  return R('div', {className},
    R(AppHeader, {onShowSettings, title}),
    R(AppMain, {settings, logs, loading, runLint}),
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
