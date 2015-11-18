var webpack = require('webpack');

module.exports = {
	entry: [
    './js/app.jsx',
		// './node_modules/bootstrap/dist/css/bootstrap.css',
		// './node_modules/bootstrap/dist/css/bootstrap-theme.css',
		// './css/style.css',
		// './js/app.jsx',
		// './node_modules/font-awesome/css/font-awesome.css',

	],
	output: {
		// path:'public',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
			{include:/.*\.css/, loader:"style-loader!css-loader"},
			{include: /.*\.jsx/, loaders: ['jsx-loader?harmony']}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	// plugins:[
	// 	new webpack.optimize.UglifyJsPlugin({
	// 		compress: {
	// 			warnings: false
	// 		}
	// 	})
	// ]
}
