module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
};
