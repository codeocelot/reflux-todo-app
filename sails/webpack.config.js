var webpack = require('webpack');

module.exports = {
	entry: [
    './assets/js/app.jsx'
    ,'./node_modules/bootstrap-material-design/dist/css/material.min.css'
    ,'./node_modules/bootstrap-material-design/dist/js/material.min.js'
		,'./assets/styles/style.scss'
    //,'./assets/s/style.scss'
		// './node_modules/bootstrap/dist/css/bootstrap.css',
		// './node_modules/bootstrap/dist/css/bootstrap-theme.css',
		// './css/style.css',
		// './js/app.jsx',
		,'./node_modules/font-awesome/css/font-awesome.css',

	],
	output: {
		path:'assets',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.woff(2)?.*/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.(ttf|eot|svg).*/, loader: "file-loader" },
      {test:/.*\.scss$/,loaders:["style","css","sass"]},
			{test:/.*\.json$/,loader:"json-loader"},
			{include:/.*\.css/, loader:"style-loader!css-loader"},
			{include: /.*\.jsx/, loaders: ['jsx-loader?harmony']}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins:[
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// })
	]
}
