const webpackConfig = require('./webpack.config')
    , {output: {publicPath}} = webpackConfig

module.exports = require('webpack-dev-middleware')(
  require('webpack')(webpackConfig),
  {publicPath}
)