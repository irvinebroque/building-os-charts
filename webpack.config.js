var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
  entry: {
    ld3: ["./src/entry"]
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: "babel-loader", exclude: /node_modules/},
      {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", [
          "css-loader",
          "autoprefixer-loader?browsers=last 2 version",
          "sass-loader?outputStyle=compact",
        ].join("!")), exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./build")
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
  ],
};
