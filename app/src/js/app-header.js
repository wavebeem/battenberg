'use strict';

const R = require('react').createElement;
const T = require('./translation.json');

function AppHeader(props) {
  const {title} = props;
  return R('header', {className: 'AppHeader'},
    R('span', {className: 'AppTitle'},
      T.APP_NAME,
      R('span', {className: 'AppSubtitle', title}, title)
    ),
    R('button', {
      className: 'SettingsButton',
      onClick: props.onShowSettings
    }, T.SETTINGS)
  );
}

module.exports = AppHeader;
