var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    ld3: ['./src/index'],
    vendor: ['./src/vendor']
  },
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
    path: path.join(__dirname, './build')
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
  ]
};
