'use strict';

const R = require('react').createElement;
const T = require('./translation.json');
const MainActionBar = require('./main-action-bar');

function AppHeader(props) {
  const {title, loading, runLint, onShowSettings} = props;
  return R('header', {className: 'AppHeader'},
    R('div', {className: 'AppTitle'},
      T.APP_NAME,
      R('span', {className: 'AppSubtitle', title}, title)
    ),
    R(MainActionBar, {loading, runLint, onShowSettings})
  );
}

module.exports = AppHeader;
