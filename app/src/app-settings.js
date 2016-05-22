'use strict';

require('./app-settings.less');
const css = require('./css');
const R = require('react').createElement;

function AppSettings(props) {
  const className = css({AppSettings: true, hidden: !props.isVisible});
  return R('div', {className},
    R('div', {className: 'AppSettingsContent'},
      'want some settings? ',
      R('button', {onClick: props.onHideSettings}, 'Close')
    )
  );
}

module.exports = AppSettings;
