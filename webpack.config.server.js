const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const common = require('./webpack.config.common')
const path = require("path");

module.exports = merge(common, {
  name: 'server',
  target: 'node',
  entry: './server/server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      {
        test: /\.(scss|css)$/i,
        use: [
          // 'style-loader',
          // 'css-modules-typescript-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportOnlyLocals: true,
                exportLocalsConvention: 'asIs',
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'sass-loader'
        ]
      },
      // {
      //   test: /\.(png|jpe?g|svg|gif)$/i,
      //   type: 'asset/resource',
      // }
      // {
      //   test: /\.css$/,
      //   use: [
      //     // MiniCssExtractPlugin.loader,
      //     'css-loader/locals'
      //   ]
      // },
    ]
  }
})