const path = require('path')


module.exports = {
	entry: {
		index: './client/js/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js'
	}
}