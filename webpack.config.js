/*
  Note that you need to make sure the build has completely
  finished before reloading your web page - otherwise,
  only a partial bundle will be served
*/

module.exports = {
  /* starting point for our frontend JavaScript (place to enter when bundling) */
  entry: './client/index.js',
  /* where to output our newly bundled file */
  output: {
    path: __dirname + '/public', // the ABSOLUTE path for the directory
    filename: 'bundle.js' // the name of the file that will contain our output - we could name this whatever we want, but bundle.js is convention
  },
  devtool: "source-map",
  /* extra modules to incorporate when parsing files */
  module: {
    rules: [{
      test: /jsx?$/, // which files to apply this loader to (end in `js` or `jsx`)
      exclude: /(node_modules|bower_components)/, // which folders to ignore / not apply this to
      use: ['babel-loader'] // which loader to use for this rule-set --> check out .babelrc for our specified rules
    }]
  }
}
