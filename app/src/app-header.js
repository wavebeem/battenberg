require('./app-header.less');
const R = require('react').createElement;
const T = require('./translation.json');

function AppHeader(props) {
  return R('header', {className: 'AppHeader'},
    R('img', {
      className: 'AppIcon',
      src: '/img/favicon-32.png',
      width: 16,
      height: 16
    }),
    R('span', {className: 'AppTitle'},
      T.APP_NAME,
      R('span', {className: 'AppSubtitle'}, 'CWD')
    ),
    R('button', {className: 'SettingsButton'}, T.SETTINGS)
  );
}

module.exports = AppHeader;
