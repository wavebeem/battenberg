require('./app-main.less');
const R = require('react').createElement;
const T = require('./translation.json');

function AppMain(props) {
  return R('main', {className: 'AppMain'},
    R('div', {className: 'MainActionBar'}, 'Main Actions'),
    R('div', {className: 'LogView'}, 'Logs'),
    R('div', {className: 'SecondaryActionBar'}, 'Secondary Actions')
  );
}

module.exports = AppMain;
