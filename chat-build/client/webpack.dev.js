const webpack = require("webpack");
const merge = require("webpack-merge");
const PATHS = require("./paths");
const parts = require("./webpack.parts");

developmentConfig = app =>
  merge([
    {
      plugins: [new webpack.HotModuleReplacementPlugin()]
    },
    parts.generateSourceMaps({ type: "eval-source-map" }),
    parts.devServer(),
    parts.developmentCSS({
      include: PATHS.app,
      exclude: /node_modules/
    }),
    parts.loadImages()
  ]);

module.exports = developmentConfig;
