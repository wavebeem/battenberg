const {fetch, Headers, Request} = window;

function gimme(req) {
  return fetch(req)
    .then(resp => {
      if (resp.ok) {
        return resp;
      } else {
        throw resp;
      }
    })
    .then(resp => resp.json());
}

function POST(url, data) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const body = JSON.stringify(data);
  const method = 'POST';
  const req = new Request(url, {body, method, headers});
  return gimme(req);
}

function PUT(url, data) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const body = JSON.stringify(data);
  const method = 'PUT';
  const req = new Request(url, {body, method, headers});
  return gimme(req);
}

function GET(url) {
  return gimme(url);
}

function lint(paths) {
  return POST('/lint', {paths});
}

function open(editor, file, line, column) {
  const path = [file, line, column].join(':');
  return POST('/open', {editor, path});
}

function cwd() {
  return GET('/cwd');
}

function saveSettings(settings) {
  return PUT('/settings', settings);
}

function loadSettings(settings) {
  return GET('/settings');
}

exports.lint = lint;
exports.open = open;
exports.cwd = cwd;
exports.saveSettings = saveSettings;
exports.loadSettings = loadSettings;
