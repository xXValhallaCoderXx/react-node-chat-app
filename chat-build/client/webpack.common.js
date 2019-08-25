const webpack = require("webpack");
const merge = require("webpack-merge");
const PATHS = require("./paths");
const path = require("path");
const parts = require("./webpack.parts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("chat-shared/env-keys.json");

commonConfig = app =>
  merge([
    {
      entry: {
        app: PATHS.app
      },
      output: {
        publicPath: "/", // Need this for nested routes
      },
      resolve: {
        modules: [PATHS.app, "node_modules"],
        extensions: [".js", ".ts", ".tsx"]
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: "Valhalla Chat",
          template: path.join(PATHS.app, "index.html")
        }),
        new webpack.NamedModulesPlugin()
      ]
    },
    parts.loadJavaScript({ include: [PATHS.app, PATHS.shared], exclude: /node_modules/ }),
    parts.setFreeVariables(config[app.target])
  ]);

module.exports = commonConfig;
