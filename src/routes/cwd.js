function cwd(req, res) {
  const cwd = process.cwd();
  res.json(cwd);
  // const home = process.env.HOME || '';
  // const dir = cwd.indexOf(home) === 0 ?
  //   cwd.replace(home, '~') :
  //   cwd;
  // res.json(dir);
}

module.exports = cwd;
