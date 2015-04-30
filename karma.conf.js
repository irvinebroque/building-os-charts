var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    autoWatch: true,
    browsers: ['PhantomJS'],
    files: [
      // React explodes in PhantomJS without a bind polyfill
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ],
  	frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {test: /\.js$/, loaders: ['babel-loader']},
          {test: /\.jsx$/, loaders: ['babel-loader', 'jsx-loader']}
        ]
      }
    },
    webpackServer: {
      noInfo: true
    }
  });
};
