const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	mode: 'development',
	entry: './main.js',
	devtool: 'inline-source-map',
	context: __dirname + '/app/js/',
	output: {
		path: __dirname + '/app/',
		filename: 'main.bundle.js'
	},
	devServer: {
		contentBase: __dirname + '/app/',
		publicPath: '/'
	},
	performance: {
		hints: false //disable warnings in console
	},
	module: {
		rules: [
			{
				test: /\.js$|\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					babelrc: true
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: require.resolve('css-loader'),
							options: {
								modules: true
							}
						},
						{
							loader: require.resolve('postcss-loader'),
							options: {
								ident: 'postcss',
								plugins: () => [
									require('postcss-nesting')()
								]
							}
						}
					]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({ filename: 'main.bundle.css' }),
	]
};
