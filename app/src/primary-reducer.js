const Backend = require('./backend');

function merge(obj1, obj2) {
  return Object.freeze(Object.assign({}, obj1, obj2));
}

function allLogs(log) {
  return log.messages.map(message =>
    getSpecifics(log.filePath, message)
  );
}

function getSpecifics(file, message) {
  const type = 'LINT_FILE_SPECIFIC';
  return merge({file, type}, message);
}

function processLintResults(logs) {
  return logs
    .filter(x => x.warningCount + x.errorCount > 0)
    .map(allLogs)
    .reduce((acc, x) => acc.concat(x), []);
}

const table = {
  UPDATE_LOADING: (state, action) =>
    ({loading: action.value}),

  UPDATE_FOLDER: (state, action) =>
    ({folder: action.value}),

  UPDATE_SETTINGS: (state, action) => {
    // TODO: Is it bad to write a file to the disk here in a reducer?
    const settings = merge(state.settings, action.value);
    Backend.saveSettings(settings);
    return {settings};
  },

  SHOW_SETTINGS: (state, action) =>
    ({settingsVisible: true}),

  HIDE_SETTINGS: (state, action) =>
    ({settingsVisible: false}),

  DISPLAY_LINT_RESULTS: (state, action) => {
    const logs = processLintResults(action.value.results);
    if (state.settings.replace) {
      return {logs};
    } else {
      return {logs: state.logs.concat(logs)};
    }
  },
};

function primaryReducer(state, action) {
  if (table.hasOwnProperty(action.type)) {
    const f = table[action.type];
    return merge(state, f(state, action));
  }
  return state;
}

module.exports = primaryReducer;
