'use strict';

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3200;

function greet() {
  console.log('Battenberg started at http://localhost:' + PORT + '/');
}

const APP_PATH = path.join(__dirname, '..', 'app');
const ASSETS_PATH = path.join(__dirname, '..', 'assets');

app.use(express.static(APP_PATH));
app.use(express.static(ASSETS_PATH));

app.get('/', function(req, res) {
  res.sendFile(path.join(APP_PATH, 'dist', 'index.html'));
});

app.get('/cwd', function(req, res) {
  const cwd = process.cwd();
  const home = process.env.HOME || '';
  const dir = cwd.indexOf(home) === 0 ?
    cwd.replace(home, '~') :
    cwd;
  res.json(dir);
});

app.listen(PORT, greet);

