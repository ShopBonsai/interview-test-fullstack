const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./client/src/index.html",
});

module.exports = {
  devServer: {
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
  },
  entry: "./client/src/index.tsx",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [htmlPlugin],
  resolve: {
    alias: {
      "@": path.resolve("./client/src"),
    },
    extensions: [".tsx", ".ts", "jsx", ".js"],
  },
  node: {
    fs: "empty",
  },
};
