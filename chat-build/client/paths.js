const path = require("path");

const PATHS = {
  app: path.resolve(__dirname, "../../chat-client"),
  shared: path.resolve(__dirname, "../../chat-shared"),
  build: path.resolve(__dirname, "../../dist")
};

module.exports = PATHS;
