const path = require('path')

let conf = {
  entry: './src/main.js',
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
  devServer: {
		overlay: true,
		proxy: {
			'/js-hw-api/**': {
				target: 'http://faceprog.ru/',
				secure: false,
				changeOrigin: true
			}
		}
	}
}

module.exports = (env, argv) => {
  conf.devtool =
    argv.mode === 'production' ? false : 'eval-cheap-module-source-map'
  return conf
}
