'use strict';

const express = require('express');

const C = require('./constants');
const routesIndex = require('./routes/index');
const routesCwd = require('./routes/cwd');
const routesLint = require('./routes/lint');
const routesOpen = require('./routes/open');

const app = express();

function greet() {
  console.log('Battenberg started at http://localhost:' + C.PORT + '/');
}

app.use(express.static(C.APP_PATH));
app.get('/', routesIndex);
app.get('/cwd', routesCwd);
app.get('/lint', routesLint);
app.get('/open', routesOpen);
app.post('/open', routesOpen);
app.listen(C.PORT, C.HOST, greet);
