require('./main-action-bar.less');
const R = require('react').createElement;
const ToolbarButton = require('./toolbar-button');
const LoadingSpinner = require('./loading-spinner');
const Notify = require('./notify');

function MainActionBar(props) {
  const {loading, runLint} = props;
  return R('div', {className: 'MainActionBar'},
    R(ToolbarButton, {text: 'Lint JS', onClick: runLint}),
    R(LoadingSpinner, {hidden: !loading})
  );
}

module.exports = MainActionBar;
