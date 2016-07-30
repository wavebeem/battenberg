const Backend = require('./backend');
const Notify = require('./notify');

function flatMap(xs, f) {
  return xs.reduce((ys, x) => ys.concat(f(x)), []);
}

function cons(x, xs) {
  return [x].concat(xs);
}

function merge(obj1, obj2) {
  return Object.freeze(Object.assign({}, obj1, obj2));
}

function allLogs(log) {
  const fileHeader = {
    type: 'LINT_FILE',
    file: log.filePath
  };
  const messages = flatMap(log.messages, message =>
    getSpecifics(log.filePath, message)
  );
  return cons(fileHeader, messages);
}

function getSpecifics(file, message) {
  return merge({type: 'LINT_FILE_SPECIFIC', file}, message);
}

function processLintResults(logs) {
  const validLogs = logs.filter(x => x.warningCount + x.errorCount > 0);
  return flatMap(validLogs, allLogs);
}

const table = {
  UPDATE_LOADING: (state, action) =>
    ({loading: action.value}),

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
    if (action.value.errorCount > 0) {
      Notify.buildError();
    }
    return {logs};
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
