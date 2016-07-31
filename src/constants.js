const path = require('path');

const HOME = process.env.HOME || process.env.USERPROFILE;
const USER_SETTINGS_FILE = path.join(HOME, '.battenberg-preferences.json');
const PROJECT_SETTINGS_FILE = '.battenberg.json';
const APP_PATH = path.join(__dirname, '..', 'app');
const PORT = 3200;
const HOST = '127.0.0.1';
const URL = 'http://localhost:' + PORT + '/';

module.exports = {
  USER_SETTINGS_FILE,
  PROJECT_SETTINGS_FILE,
  APP_PATH,
  PORT,
  HOST,
  URL,
};
