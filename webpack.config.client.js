const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const common = require('./webpack.config.common')
const path = require("path");

module.exports = merge(common, {
  name: 'client',
  target: 'web',
  entry: './src/index.tsx',
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, 'build/public/'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportLocalsConvention: 'asIs',
                localIdentName: '[local]_[hash:base64:5]'
              }
            }
          },
          'sass-loader',
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader']
      // },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ]
})
