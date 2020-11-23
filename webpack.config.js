const path = require('path')
require('babel-polyfill')

let conf = {
  entry: { app: ['babel-polyfill', './src/main.js'] },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: 'dist/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}

module.exports = (env, argv) => {
  conf.devtool =
    argv.mode === 'production' ? false : 'eval-cheap-module-source-map'
  return conf
}
