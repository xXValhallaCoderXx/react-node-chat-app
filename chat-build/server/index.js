const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  target: "node",
  entry: path.resolve(__dirname, "../../chat-server/index.ts"),
  output: {
    path: path.resolve(__dirname, "../../dist"),
    filename: "server.js"
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  externals: [
    nodeExternals({
      modulesFromFile: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  node: true
                }
              }
            ],
            "@babel/typescript"
          ],
          plugins: ['@babel/plugin-proposal-class-properties']
        },
        exclude: /node_modules/
      }
    ]
  }
};
