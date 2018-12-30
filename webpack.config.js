// webpack v4
const path = require('path');
// update 23.12.2018
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  target: "node", // update 23.12.2018
  externals: [nodeExternals()], // update 23.12.2018
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          'postcss-loader',
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      filename: "style[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      server: {baseDir: ['dist']},
      port: 3000,
    }),
    new WebpackMd5Hash()
  ]
};