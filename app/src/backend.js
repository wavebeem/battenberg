const {fetch, Headers, Request} = window;

function POST(url, data) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  const body = JSON.stringify(data);
  const method = 'POST';
  const req = new Request(url, {body, method, headers});
  return fetch(req).then(resp => resp.json());
}

function GET(url) {
  return fetch(url).then(resp => resp.json());
}

function lint(path) {
  return POST('/lint', {path});
}

function open(file, line, column) {
  const path = [file, line, column].join(':');
  return POST('/open', {path});
}

function cwd() {
  return GET('/cwd');
}

exports.lint = lint;
exports.open = open;
exports.cwd = cwd;
