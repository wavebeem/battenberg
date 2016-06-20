const OpenInEditor = require('open-in-editor');

function onError() {
  console.error('Failed to configure text editor');
}

function open(req, res) {
  // TODO: Error if path is missing
  const editor = req.body.editor;
  const path = req.body.path;
  // Documentation: https://www.npmjs.com/package/open-in-editor
  const opener = OpenInEditor.configure({editor}, onError)
  opener.open(path)
    .then(() => { res.json(true); })
    .catch(() => { res.json(false); });
}

module.exports = open;
