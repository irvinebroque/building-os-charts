'use strict';

var webpack = require('webpack');

module.exports = function(config) {
  config.set({
  	basePath: '',
  	frameworks: ['jasmine'],
  	files: ['src/**/*-test.js'],
    preprocessors: {
  	  'src/**/*-test.js': ['babel', 'webpack']
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
  		}
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
