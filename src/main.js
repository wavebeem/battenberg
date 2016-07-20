'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');

const C = require('./constants');
const watcher = require('./watcher');
const routesIndex = require('./routes/index');
const routesCwd = require('./routes/cwd');
const routesLint = require('./routes/lint');
const routesOpen = require('./routes/open');
const routesLoadSettings = require('./routes/load-settings');
const routesSaveSettings = require('./routes/save-settings');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

function greet() {
  console.log('Battenberg started at http://localhost:' + C.PORT + '/');
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
app.get('/', routesIndex);
app.get('/cwd', routesCwd);
app.post('/lint', routesLint);
app.post('/open', routesOpen);
app.get('/settings', routesLoadSettings);
app.put('/settings', routesSaveSettings);

server.listen(C.PORT, C.HOST, greet);
