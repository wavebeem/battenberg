'use strict';

const T = require('./translation');
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

// function checkboxSetting(props, header, description, name) {
//   const {settings, updateSettings} = props;
//   return R('div', {className: 'AppSettingGroup'},
//     R('div', {className: 'AppSettingHeader'}, header),
//     R('label', {className: 'AppSettingCheckboxLabel'},
//       R('input', {
//         className: 'AppSettingCheckbox',
//         checked: settings[name],
//         type: 'checkbox',
//         onChange: event =>
//           updateSettings({[name]: event.target.checked})
//       }),
//       description
//     )
//   );
// }

function dropdownSetting(props, header, description, name, options) {
  const {settings, updateSettings} = props;
  const value = settings[name];
  const onChange = event => {
    updateSettings({[name]: event.target.value});
  };
  return R('div', {className: 'AppSettingGroup'},
    R('div', {className: 'AppSettingHeader'}, header),
    R('div', {className: 'AppSettingDescription'}, description),
    R('select', {className: 'AppSettingDropdown', onChange, value},
      options.map(x =>
        R('option', {key: x.value, value: x.value}, x.name)
      )
    )
  );
}

function themeDropdown(props) {
  return dropdownSetting(
    props,
    T.SETTINGS_HEADER_THEME,
    T.SETTINGS_DESCRIPTION_THEME,
    'theme',
    [
      {value: 'dark', name: 'Dark'},
      {value: 'light', name: 'Light'}
    ]
  );
}

function editorDropdown(props) {
  return dropdownSetting(
    props,
    T.SETTINGS_HEADER_EDTIOR,
    T.SETTINGS_DESCRIPTION_EDITOR,
    'editor',
    [
      {value: 'sublime', name: 'Sublime Text'},
      {value: 'atom', name: 'Atom Editor'},
      {value: 'code', name: 'Visual Studio Code'},
      {value: 'webstorm', name: 'WebStorm'},
      {value: 'phpstorm', name: 'PhpStorm'},
      {value: 'idea14ce', name: 'IDEA 14 CE'},
    ]
  );
}

function titleText(props) {
  return textSetting(
    props,
    T.SETTINGS_HEADER_TITLE,
    T.SETTINGS_DESCRIPTION_TITLE,
    'title'
  );
}

function AppSettings(props) {
  const className = css({
    AppSettings: true,
    ThemeDark: true,
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
      titleText(props),
      themeDropdown(props),
      editorDropdown(props)
    )
  );
}

module.exports = AppSettings;
