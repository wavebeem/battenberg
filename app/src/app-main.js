require('./app-main.less');
const R = require('react').createElement;
const T = require('./translation.json');
const LogView = require('./log-view');

function range(n) {
  const xs = [];
  for (var i = 0; i < n; i++) {
    xs.push(i);
  }
  return xs;
}

const FAKE_LOGS =
  range(30).map(x => ({type: 'WhoKnows', data: {message: 'Nice ' + x}}));

function AppMain(props) {
  return R('main', {className: 'AppMain'},
    R('div', {className: 'MainActionBar'}, 'Main Actions'),
    R(LogView, {logs: FAKE_LOGS}),
    R('div', {className: 'SecondaryActionBar'}, 'Secondary Actions')
  );
}

module.exports = AppMain;
