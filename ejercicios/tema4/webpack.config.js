'use strict';

//configuracion de webpack para compilar JSX y crear el bundle
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './public/dist',
    sourceMapFilename: "./public/dist/[file].map",
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include: path.join(__dirname, './src') }
    ]
  }
};