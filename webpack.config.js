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
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader', 'eslint-loader']},
      {test: /\.jsx$/, exclude: /node_modules/, loaders: ['babel-loader', 'jsx-loader']},
      {test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'autoprefixer-loader?browsers=last 2 version',
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
