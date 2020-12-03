require('@babel/polyfill')
const path = require('path')
const HTML = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const webpack = require('webpack')

const isProduction = process.argv.join('').includes('production')
const isDevelopment = !isProduction

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: isProduction ? 'production' : 'development',
  entry: {
    index: './js/main.js',
  },
  output: {
    publicPath: '/',
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.scss', '.css', '.json'],
    alias: {
      vue: 'vue/dist/vue.js',
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      minSize: 10000,
      maxSize: 250000,
    },
    minimize: isProduction,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new HTML({
      template: './index.html',
      minify: isProduction,
    }),
    /*     new CopyPlugin({
      patterns: [
        { from: '.htaccess' },
        { from: 'favicon.ico' },
      ],
    }), */
    new webpack.DefinePlugin({
      isDevelopment: isDevelopment,
      isProduction: isProduction,
    }),
  ],
  devServer: {
    overlay: true,
    proxy: {
      '/js-hw-api/**': {
        target: 'http://faceprog.ru/',
        secure: false,
        changeOrigin: true,
      },
    },
  },
}

/* module.exports = (env, argv) => {
  conf.devtool =
    argv.mode === 'production' ? false : 'eval-cheap-module-source-map'
  return conf
} */
