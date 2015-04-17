'use strict';

var webpack = require('webpack');

module.exports = function(config) {
  config.set({
  	basePath: '',
  	frameworks: ['jasmine'],
  	files: ['tests/**/*.js'],
    preprocessors: {
  	  'tests/**/*.js': ['babel', 'webpack']
  	},
  	webpack: {
  		devtool: 'inline-source-map',
  		resolve: {
  			extensions: ["", ".js"]
  		},
  		module: {
  			loaders: [
  				{test: /\.js$/, loader: "babel-loader"}
  			]
  		},
  		plugins: [
  			new webpack.DefinePlugin({
  				'process.env.NODE_ENV': JSON.stringify('test')
  			})
  		]
  	},
  	webpackMiddleware: {
  		stats: {
  			colors: true
  		}
  	},
  	reporters: ['spec'],
  	port: 9876,
  	colors: true,
    logLevel: config.LOG_INFO,
  	autoWatch: true,
  	browsers: ['PhantomJS'],
  	captureTimeout: 60000,
  	singleRun: false
  });
};
