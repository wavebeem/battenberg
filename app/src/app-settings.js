'use strict';

require('./app-settings.less');
const css = require('./css');
const R = require('react').createElement;

function AppSettings(props) {
  const {folder, updateFolder} = props;
  const className = css({
    AppSettings: true,
    hidden: !props.isVisible
  });
  return R('div', {className},
    R('div', {className: 'AppSettingsContent'},
      R('input', {
        type: 'text',
        value: folder,
        onChange: event => updateFolder(event.target.value)
      }),
      R('button', {onClick: props.onHideSettings}, 'Close')
    )
  );
}

module.exports = AppSettings;
