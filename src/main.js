'use strict';

const express = require('express');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());
app.get('/', routesIndex);
app.get('/cwd', routesCwd);
app.post('/lint', routesLint);
app.post('/open', routesOpen);
app.listen(C.PORT, C.HOST, greet);
