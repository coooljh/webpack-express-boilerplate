'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { "presets": ["react", "es2015", "stage-0", "react-hmre"] }
        }]
      }, 
      {
        test: /\.(css)$/,
        loader: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
			  ]
		  },
      // {
      //   test: /\.css$/,
      //   use: ['style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]']
      // }
    ]
  }
};
