function css(obj) {
  return Object.keys(obj).filter(key => obj[key]).join(' ');
}

module.exports = css;
