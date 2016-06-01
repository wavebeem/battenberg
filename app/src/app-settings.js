'use strict';

require('./app-settings.less');
const T = require('./translation.json');
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
      R('button', {
        className: 'AppSettingsButton',
        onClick: props.onHideSettings
      }, T.CLOSE),
      R('div', {className: 'AppSettingGroup'},
        R('div', {className: 'AppSettingHeader'},
          T.SETTINGS_HEADER_FOLDER
        ),
        R('div', {className: 'AppSettingDescription'},
          T.SETTINGS_DESCRIPTION_FOLDER
        ),
        R('input', {
          className: 'AppSettingInput',
          type: 'text',
          value: folder,
          onChange: event => updateFolder(event.target.value)
        })
      )
    )
  );
}

module.exports = AppSettings;
