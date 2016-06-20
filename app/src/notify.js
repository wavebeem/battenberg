const T = require('./translation.json');

const {Notification} = window;

function send(title, body) {
  // If I understand this correctly, `tag` will make all notifications replace
  // each other. This should be nice so as not to clog up the notification
  // center too badly. Also `renotify` is neeeded in Chrome or else the notification won't appear until the old one is dismissed.
  new Notification(title, {
    body,
    tag: 'battenberg',
    renotify: true
  });
}

function buildError() {
  send(T.BUILD_ERROR);
}

exports.buildError = buildError;
