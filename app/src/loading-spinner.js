require('./loading-spinner.less');
const R = require('react').createElement;

const css = require('./css');

function LoadingSpinner(props) {
  const {hidden} = props;
  const className = css({
    LoadingSpinner: true,
    hidden
  });
  return R('div', {className});
}

module.exports = LoadingSpinner;
