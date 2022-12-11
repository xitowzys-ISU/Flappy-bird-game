const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './js/app.js'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    })
  ],
  devServer: {
    static: path.join(__dirname, 'src'),
    historyApiFallback: true,
    port: 3000,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    // open: {
    // 	app: {
    // 		name: 'google-chrome',
    // 	},
    // },
    hot: true,
  },
}