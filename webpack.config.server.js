const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  name: "server",
  mode: "development",
  entry: {
    app: "./server/index.ts",
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      { test: /\.ts?$/, loader: "ts-loader" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    publicPath: "./",
    path: path.resolve(__dirname, "dist/server"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  target: "node",
  resolve: {
    alias: {
      "@": path.resolve("./server"),
    },
    extensions: [".ts", ".js"],
  },
};
