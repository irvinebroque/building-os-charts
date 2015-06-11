var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var fs = require('fs');

var _supportedBrowsers = [
  'Safari >= 6',
  'Chrome >= 26',
  'Firefox >= 10',
  'Explorer >= 9',
  'iOS >= 6',
  'ChromeAndroid >= 26'
];

function _getAutoPrefixerParams() {
  return '?{browsers:["' + _supportedBrowsers.join('", "') + '"]}';
};

function _getEntry() {
  return fs.readdirSync(__dirname).reduce(function(entries, dir) {
    var isDraft = dir.charAt(0) === '_';
    if (!isDraft && _isDirectory(path.join(__dirname, dir))) {
      entries[dir] = path.join(__dirname, dir, 'index.js');
    }
    return entries;
  }, {});
};

function _isDirectory(dir) {
  return fs.lstatSync(dir).isDirectory();
};

module.exports = {
  devtool: 'eval',
  entry: _getEntry(),
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'autoprefixer-loader' + _getAutoPrefixerParams(),
        'sass-loader?outputStyle=compressed',
      ].join('!')), exclude: /node_modules/}
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
      'building-os-charts': '../../src/index'
    }
  }
};
