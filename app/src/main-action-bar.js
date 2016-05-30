require('./main-action-bar.less');
const R = require('react').createElement;
const ToolbarButton = require('./toolbar-button');
const LoadingSpinner = require('./loading-spinner');

function MainActionBar(props) {
  const {loading, runLint} = props;
  return R('div', {className: 'MainActionBar'},
    R(ToolbarButton, {text: 'Lint', onClick: runLint}),
    R(ToolbarButton, {text: 'Action 2'}),
    R(ToolbarButton, {text: 'Action 3'}),
    R(LoadingSpinner, {hidden: !loading})
  );
}

module.exports = MainActionBar;
