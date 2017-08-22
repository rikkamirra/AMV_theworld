module.exports = function moduleExports() {
  var config = {};

  config.entry = './src/app/app.js';

  config.output = {
    path: __dirname + '/dist',
    filename: 'app.bundle.js'
  };

  config.module = {
    loaders: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  };

  return config;

}();
