import path from 'path';
import nodeExternals from 'webpack-node-externals';

const DEPLOY = process.env.DEPLOY === 'true';

const root = path.resolve(__dirname);

module.exports = {
	entry: {
		index: './lib/index.js',
	},
	target: 'web',
	devtool: 'source-map',
	externals: [nodeExternals()],
	output: {
		path: DEPLOY ? path.resolve(root) : path.resolve(root, 'dist'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								['env', {modules: false, targets: {browsers: 'last 2 versions'}}],
								'flow',
							],
						},
					},
				],
			},
		],
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// 	sourceMap: true,
		// }),
	],
};
