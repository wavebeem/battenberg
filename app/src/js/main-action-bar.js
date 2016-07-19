const R = require('react').createElement;
const ToolbarButton = require('./toolbar-button');
const LoadingSpinner = require('./loading-spinner');
const Notify = require('./notify');
const T = require('./translation');

function MainActionBar(props) {
  const {loading, runLint} = props;
  return R('div', {className: 'MainActionBar'},
    R(ToolbarButton, {text: T.LINT_ALL, onClick: runLint}),
    R(LoadingSpinner, {hidden: !loading})
  );
}

module.exports = MainActionBar;
