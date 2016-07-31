'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const OpenURL = require('openurl');
const Chalk = require('chalk');

const C = require('./constants');
const watcher = require('./watcher');
const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

function greet() {
  console.log(
    Chalk.bold.magenta('Battenberg') +
    Chalk.bold.yellow(' started at ') +
    Chalk.bold.blue(C.URL)
  );
  OpenURL.open(C.URL);
  // TODO: Open the browser to that URL!
}

// We don't really care about connections or anything here — the point of
// Socket.IO in this app is just a big broadcasting firehose to spray change
// messages down. There's no streaming API for ESlint, so that's the only thing
// this gets used for.

watcher(path => {
  io.emit('file-update', path);
});

app.use(express.static(C.APP_PATH));
app.use(bodyParser.json());
app.get('/', routes.Html);
app.post('/lint', routes.Lint);
app.post('/open', routes.Open);
app.get('/settings', routes.LoadSettings);
app.put('/settings', routes.SaveSettings);

server.listen(C.PORT, C.HOST, greet);
