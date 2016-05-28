require('./line-number.less');
const R = require('react').createElement;

function LineNumber(props) {
  const {line} = props;
  return R('span', {className: 'LineNumber'}, 'line ', line);
}

module.exports = LineNumber;
