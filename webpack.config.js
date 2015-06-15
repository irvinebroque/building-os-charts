var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var _prepublishMode = process.env.NODE_ENV === 'prepublish' ? true : false;

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

var config = {
  entry: {
    index: ['./src/index']
  },
  module: {
    preLoaders: [
      {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'autoprefixer-loader' + _getAutoPrefixerParams(),
        'sass-loader?outputStyle=compressed'
      ].join('!')), exclude: /node_modules/}
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './build')
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

if (_prepublishMode) {
  config.externals = {
    'classnames': 'classnames',
    'clone': 'clone',
    'css-layout': 'css-layout',
    'd3': 'd3',
    'javascript-natural-sort': 'javascript-natural-sort',
    'moment': 'moment',
    'object-assign': 'object-assign',
    'object-property-natural-sort': 'object-property-natural-sort',
    'react': 'react'
  };

  config.output = {
    filename: '[name].js',
    path: path.join(__dirname, './lib'),
    libraryTarget: 'umd',
    library: 'building-os-charts',
  };
}


module.exports = config;
