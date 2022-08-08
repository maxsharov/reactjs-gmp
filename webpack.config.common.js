const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isProdMode = process.env.NODE_ENV === 'production'

module.exports = {
  mode: isProdMode ? 'production' : 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
    ]
  },
}