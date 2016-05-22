'use strict';

require('./app.less');
require('whatwg-fetch');
const R = require('react').createElement;
const connect = require('react-redux').connect;
const AppHeader = require('./app-header');
const AppMain = require('./app-main');
const AppSettings = require('./app-settings');
const primaryReducer = require('./primary-reducer');

function App(props) {
  const dispatch = props.dispatch;
  const onShowSettings = function() {
    dispatch({type: 'SHOW_SETTINGS'});
  };
  const onHideSettings = function() {
    dispatch({type: 'HIDE_SETTINGS'});
  };
  return R('div', {className: 'App'},
    R(AppHeader, {onShowSettings, subtitle: props.subtitle}),
    R(AppMain, {}),
    R(AppSettings, {isVisible: props.settingsVisible, onHideSettings})
  );
}

const ConnectedApp = connect(primaryReducer)(App);

module.exports = ConnectedApp;
