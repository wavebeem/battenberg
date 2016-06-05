'use strict';

require('./app-settings.less');
const T = require('./translation.json');
const css = require('./css');
const R = require('react').createElement;

function textSetting(props, header, description, name) {
  const {settings, updateSettings} = props;
  return R('div', {className: 'AppSettingGroup'},
    R('div', {className: 'AppSettingHeader'}, header),
    R('div', {className: 'AppSettingDescription'}, description),
    R('input', {
      className: 'AppSettingInput',
      value: settings[name],
      type: 'text',
      onChange: event =>
        updateSettings({[name]: event.target.value})
    })
  );
}

function checkboxSetting(props, header, description, name) {
  const {settings, updateSettings} = props;
  return R('div', {className: 'AppSettingGroup'},
    R('div', {className: 'AppSettingHeader'}, header),
    // R('div', {className: 'AppSettingDescription'}, description),
    R('label', {className: 'AppSettingCheckboxLabel'},
      R('input', {
        className: 'AppSettingCheckbox',
        value: settings[name],
        type: 'checkbox',
        onChange: event =>
          updateSettings({[name]: event.target.value})
      }),
      description
    )
  );
}

function getSettings(props) {
  return [
    textSetting(
      props,
      T.SETTINGS_HEADER_FOLDER,
      T.SETTINGS_DESCRIPTION_FOLDER,
      'folder'
    ),
    checkboxSetting(
      props,
      'Replace',
      'Should it replace?',
      'replace'
    )
  ];
}

function AppSettings(props) {
  const className = css({
    AppSettings: true,
    hidden: !props.isVisible
  });
  return R('div', {className},
    R('div', {className: 'AppSettingsTitleArea'},
      R('span', {className: 'AppSettingsTitle'}, T.SETTINGS),
      R('button', {
        className: 'AppSettingsCloseButton',
        onClick: props.onHideSettings
      }, T.CLOSE)
    ),
    R('div', {className: 'AppSettingsContent'},
      getSettings(props),
      getSettings(props),
      getSettings(props),
      getSettings(props),
      getSettings(props),
      getSettings(props),
      getSettings(props),
      getSettings(props),
      getSettings(props),
      getSettings(props),
      getSettings(props)
    )
  );
}

module.exports = AppSettings;
