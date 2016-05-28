require('./toolbar-button.less');
const R = require('react').createElement;

function ToolbarButton(props) {
  const {text} = props;
  return R('button', {className: 'ToolbarButton'}, text);
}

module.exports = ToolbarButton;
