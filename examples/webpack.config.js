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
      entries[dir] = path.join(__dirname, dir, 'example.js');
    }
    return entries;
  }, {}),
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {test: /\.jsx$/, exclude: /node_modules/, loaders: ['babel-loader', 'jsx-loader']},
      {test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'autoprefixer-loader?browsers=last 2 version',
        'sass-loader?outputStyle=compressed',
      ].join('!'))}
    ]
  },
  output: {
    path: 'examples/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};
