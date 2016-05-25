function merge(obj1, obj2) {
  return Object.freeze(Object.assign({}, obj1, obj2));
}

function allLogs(log) {
  const summary = {
    type: 'LINT_FILE',
    file: log.filePath,
    warningCount: log.warningCount,
    errorCount: log.errorCount
  };
  const specifics =
    log.messages.map(message =>
      getSpecifics(log.filePath, message)
    );
  return [summary].concat(specifics);
}

function getSpecifics(file, message) {
  const type = 'LINT_FILE_SPECIFIC';
  return merge({file, type}, message);
}

const table = {
  UPDATE_SUBTITLE: (state, action) => ({subtitle: action.value}),
  SHOW_SETTINGS: (state, action) => ({settingsVisible: true}),
  HIDE_SETTINGS: (state, action) => ({settingsVisible: false}),
  DISPLAY_LINT_RESULTS: (state, action) => {
    const summary = {
      type: 'LINT_FILE',
      file: '__PROJECT__',
      warningCount: action.value.warningCount,
      errorCount: action.value.errorCount
    };
    const logs = action.value.results
      .filter(x => x.warningCount + x.errorCount > 0)
      .map(allLogs)
      .reduce((acc, x) => acc.concat(x), []);
    const newLogs = state.logs.concat([summary], logs);
    // const newLogs = state.logs.concat(logs);
    return {logs: newLogs};
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
