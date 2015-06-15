var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    index: './testBuild/index'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  },
  output: {
    filename: '[name].js',
    path: 'testBuild/__build__',
    publicPath: '/__build__/'
  },
  resolve: {
    alias: {
      'building-os-charts': '../lib/index'
    }
  }
};
