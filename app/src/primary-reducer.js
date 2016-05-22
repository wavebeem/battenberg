function merge(obj1, obj2) {
  return Object.freeze(Object.assign({}, obj1, obj2));
}

const table = {
  UPDATE_SUBTITLE: action => ({subtitle: action.value}),
  SHOW_SETTINGS: _ => ({settingsVisible: true}),
  HIDE_SETTINGS: _ => ({settingsVisible: false}),
};

function primaryReducer(state, action) {
  if (table.hasOwnProperty(action.type)) {
    return merge(state, table[action.type](action));
  }
  return state;
}

module.exports = primaryReducer;
