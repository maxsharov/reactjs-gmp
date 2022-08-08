const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

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
      {
        test: /\.(scss|css)$/i,
        use: [
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
    ]
  }
})