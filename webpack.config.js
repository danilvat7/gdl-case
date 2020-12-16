const path = require('path');

module.exports = {
  entry: {
    gdl: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.join(__dirname, './sample-app'),
    filename: '[name].js',
  },

  mode: 'development',
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, './sample-app'),
    host: 'localhost',
    port: 8888,
  },
};
