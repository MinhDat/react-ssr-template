const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const SOURCE_DIR = path.dirname(__dirname);
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const browserConfig = {
  entry: SOURCE_DIR + "/src/browser/index.js",
  output: {
    path: SOURCE_DIR,
    filename: "./public/bundle.js",
    publicPath: "/"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|ico|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, "")
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true, // export class name in css
                importLoaders: 1,
                localIdentName: "[local]" // Hash sass classname
              }
            },
            {
              loader: "sass-loader",
              options: {
                modules: true, // export class name in scss
                importLoaders: 1,
                localIdentName: "[local]" // Hash sass classname
              }
            },
            {
              loader: "postcss-loader",
              options: { plugins: [autoprefixer()] }
            }
          ]
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "public/css/[name].css"
    })
  ]
};

const serverConfig = {
  target: "node",
  externals: [nodeExternals()],
  entry: "./src/server/index.js",
  output: {
    path: SOURCE_DIR,
    filename: "./dist/server.js",
    publicPath: "/",
    libraryTarget: "commonjs2"
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|ico|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emitFile: false
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: "css-loader/locals"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};

module.exports = [browserConfig, serverConfig];
