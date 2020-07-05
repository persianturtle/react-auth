const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { js: "./src/index.js" },
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: true,
    }),
  ],
  devServer: {
    host: "0.0.0.0",
    port: "80",
    proxy: {
      "/api": {
        target: "http://api",
        pathRewrite: { "^/api": "" },
      },
    },
    historyApiFallback: true,
  },
};
