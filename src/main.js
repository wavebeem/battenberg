'use strict';

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3200;

function greet() {
  console.log('Battenberg started at http://localhost:' + PORT + '/');
}

const DIST_PATH = path.join(__dirname, '..', 'app', 'dist');
const ASSETS_PATH = path.join(__dirname, '..', 'assets');

app.use(express.static(DIST_PATH));
app.use(express.static(ASSETS_PATH));

app.get('/', function(req, res) {
  res.sendFile(path.join(ASSETS_PATH, 'index.html'));
});

app.listen(PORT, greet);

