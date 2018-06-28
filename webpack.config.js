const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: './browser/index.js',
	mode: 'development',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	devtool: 'source-maps',
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
		]
	}
}
