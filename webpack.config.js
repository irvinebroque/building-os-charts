var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

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

module.exports = {
  entry: {
    index: ['./src/index'],
    vendor: ['./src/vendor']
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
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
  ],
  resolve: {
    alias: {
      'building-os-charts': '../../src/index'
    }
  }
};
