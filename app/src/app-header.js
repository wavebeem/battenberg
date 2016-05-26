'use strict';

require('./app-header.less');
const R = require('react').createElement;
const T = require('./translation.json');

function AppHeader(props) {
  return R('header', {className: 'AppHeader'},
    R('span', {className: 'AppTitle'},
      T.APP_NAME,
      R('span', {className: 'AppFolder'}, props.folder)
    ),
    R('button', {
      className: 'SettingsButton',
      onClick: props.onShowSettings
    }, T.SETTINGS)
  );
}

module.exports = AppHeader;
