var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');

function isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
}

module.exports = {
  devtool: 'inline-source-map',
  entry: fs.readdirSync(__dirname).reduce(function(entries, dir) {
    var isDraft = dir.charAt(0) === '_';
    if (!isDraft && isDirectory(path.join(__dirname, dir))) {
      entries[dir] = path.join(__dirname, dir, 'index.js');
    }
    return entries;
  }, {}),
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.(css|scss)$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'autoprefixer-loader?{browsers:["Safari >= 6", "Chrome >= 26", "Firefox >= 10", "Explorer >= 9", "iOS >= 6", "ChromeAndroid >= 26"]}',
        'sass-loader?outputStyle=compressed',
      ].join('!'))}
    ]
  },
  output: {
    filename: '[name].js',
    path: 'examples/__build__',
    publicPath: '/__build__/'
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  resolve: {
    alias: {
      'ld3': '../../src/index'
    }
  },
};
