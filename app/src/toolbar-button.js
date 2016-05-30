require('./toolbar-button.less');
const R = require('react').createElement;

function ToolbarButton(props) {
  const {text, onClick} = props;
  const className = 'ToolbarButton';
  return R('button', {className, onClick}, text);
}

module.exports = ToolbarButton;
