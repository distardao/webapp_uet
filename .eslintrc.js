/* eslint-disable no-undef */
module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:import/errors',
		'prettier'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'react-hooks',
		'jsx-a11y',
		'import'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		// 'linebreak-style': [
		// 	'error',
		// 	'windows'
		// ],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-unused-vars': 2,
	},
	'settings': {
		'react': {
			'version': 'detect', // React version. "detect" automatically picks the version you have installed.
			// You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
			// default to latest and warns if missing
			// It will default to "detect" in the future
		}
	}
};
