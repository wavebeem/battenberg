const OpenInEditor = require('open-in-editor');

const editor = OpenInEditor.configure({
  // Documentation: https://www.npmjs.com/package/open-in-editor
  // TODO: Don't hard code Sublime
  editor: 'sublime'
}, onEditorConfigureFailure)

function onEditorConfigureFailure() {
  console.error('Failed to configure text editor');
}

function open(req, res) {
  const path = req.query.path;
  editor.open(path)
    .then(() => { res.json(true); })
    .catch(() => { res.json(false); });
}

module.exports = open;
