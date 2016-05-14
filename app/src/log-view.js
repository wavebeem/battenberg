require('./log-view.less')
const R = require('react').createElement;

function LogView(props) {
  const logs = props.logs;
  return R('div', {className: 'LogView'},
    logs.map((log, i) =>
      R('div', {className: 'LogEntry', key: i}, log.data.message)
    )
  );
}

module.exports = LogView;
