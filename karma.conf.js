var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    autoWatch: true,
  	browsers: ['PhantomJS'],
  	files: ['webpack.tests.js'],
  	frameworks: ['jasmine'],
    preprocessors: {
      'webpack.tests.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.js$/, loaders: ['babel-loader', 'jsx-loader']}
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    },
    webpackServer: {
      noInfo: true
    }
  });
};
