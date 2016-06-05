'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const loaders = [
  { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader", include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'example')]}
];

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
});


const resolve = {extensions: ['', '.js', '.jsx']};
const stats = {colors: true};


const development = {
  devtool: '#source-map',

  entry: [
    './example/example.js',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {filename: 'bundle.js', path: path.resolve('example')},
  plugins: [
    new HtmlWebpackPlugin(),
    definePlugin
  ],
  module: {
    loaders,
  },
  stats,
  resolve,
  devServer: {
    historyApiFallback: true,
    stats: {
      // Do not show list of hundreds of files included in a bundle
      chunkModules: false,
      colors: true
    }
  }
};

const dist = {
  devtool: '#source-map',
  entry: './src/ReactHeightReporter.js',
  output: {
    filename: `${require('./package.json').name}.js`,
    path: path.resolve('build'),
    library: 'ReactHeightReporter',
    libraryTarget: 'umd'
  },
  plugins: [definePlugin],
  module: {loaders},
  resolve,
  stats,
  externals: {
    react: {root: 'React', commonjs2: 'react', commonjs: 'react', amd: 'react'},
    react: {root: 'ReactDOM', commonjs2: 'react-dom', commonjs: 'react-dom', amd: 'react-dom'}
  }
};


const min = {
  devtool: '#source-map',
  entry: './src/ReactHeightReporter.js',
  output: {
    filename: `${require('./package.json').name}.min.js`,
    path: path.resolve('build'),
    library: 'ReactHeightReporter',
    libraryTarget: 'umd'
  },
  plugins: [
    definePlugin,
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {loaders},
  resolve,
  stats,
  externals: {
    react: {root: 'React', commonjs2: 'react', commonjs: 'react', amd: 'react'},
    react: {root: 'ReactDOM', commonjs2: 'react-dom', commonjs: 'react-dom', amd: 'react-dom'}
  }
};

const configs = {development, dist, min};
const build = process.env.BUILD || process.env.NODE_ENV || 'development';


module.exports = configs[build];