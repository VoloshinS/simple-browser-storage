module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(bower_components|node_modules)/,
      loaders: ['babel'],
    }],
  },
  output: {
    libraryTarget: 'umd',
    library: 'simpleBrowserStorage'
  },
  resolve: {
    extensions: [
      '',
      '.js',
    ],
  },
};
