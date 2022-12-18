const CracoAlias = require('craco-alias');
const webpack = require('webpack');

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				baseUrl: './src',
				tsConfigPath: './tsconfig.paths.json',
			},
		},
		{
			plugin: new webpack.ProvidePlugin({React: 'react'}),
		},
	],
};
