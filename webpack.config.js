const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loader = require('css-loader');

module.exports = {
    entry: './src/index.js',

    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
      publicPath: '/',
      assetModuleFilename: "asset/img/[hash][ext][query]"
    },

    plugins: [
      new HTMLWebpackPlugin({
          template: './src/index.html',
          favicon: './src/assets/img/coding.ico'
      }),
      new MiniCssExtractPlugin()
    ],

    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env',{ targets: "defaults", "debug": true, "useBuiltIns": "usage", "corejs": 3}], ['@babel/preset-react', { runtime: "automatic" }]]
            }
          }
        },
        {
          test: /\.(s[ac]|c)ss$/i,
          use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: { publicPath: "" }
            },
            "css-loader",
            "postcss-loader",
            "sass-loader"
          ]
        }
      ]
    },

    devServer: {
      hot: true,
      port: 3000,
      open: false,
      historyApiFallback: true,
      historyApiFallback: {
        diasableDotRule: true
      }
    }
}