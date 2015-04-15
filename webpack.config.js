var webpack = require('webpack');
var path = require('path');

var config = {
  entry: {
    'ld3': './src/index'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'ld3.min.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: '/node_modules/', loader: 'babel-loader'}
    ]
  }
};

if (process.env.DIST) {
  config.output.libraryTarget = "var";
  config.output.library = "ld3";
  config.externals = {"d3": "d3"};
}

if (process.env.NODE_ENV === "development") {
  config.devtool = 'eval';
}

module.exports = config;
