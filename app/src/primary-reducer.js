function merge(obj1, obj2) {
  return Object.freeze(Object.assign({}, obj1, obj2));
}

function allLogs(folder, log) {
  // const summary = {
  //   type: 'LINT_FILE',
  //   file: log.filePath,
  //   warningCount: log.warningCount,
  //   errorCount: log.errorCount
  // };
  const specifics =
    log.messages.map(message =>
      getSpecifics(folder, log.filePath, message)
    );
  return specifics;
  // return [summary].concat(specifics);
}

function getSpecifics(folder, file, message) {
  const type = 'LINT_FILE_SPECIFIC';
  // TODO: Unsafe use of JS replace (fix dollar signs)
  const folder_ = folder + '/';
  const file_ =
    file.indexOf(folder_) === 0 ?
      file.replace(folder_, '') :
      file;
  return merge({file: file_, type}, message);
}

const table = {
  UPDATE_FOLDER: (state, action) => ({folder: action.value}),
  SHOW_SETTINGS: (state, action) => ({settingsVisible: true}),
  HIDE_SETTINGS: (state, action) => ({settingsVisible: false}),
  DISPLAY_LINT_RESULTS: (state, action) => {
    // const summary = {
    //   type: 'LINT_FILE',
    //   file: '__PROJECT__',
    //   warningCount: action.value.warningCount,
    //   errorCount: action.value.errorCount
    // };
    const logs = action.value.results
      .filter(x => x.warningCount + x.errorCount > 0)
      .map(allLogs.bind(null, state.folder))
      .reduce((acc, x) => acc.concat(x), []);
    // const newLogs = state.logs.concat([summary], logs);
    const newLogs = state.logs.concat(logs);
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
