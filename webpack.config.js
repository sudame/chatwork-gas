// @ts-check

const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: "production",
  entry: path.join(__dirname, "src", "index.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    iife: false,
    libraryTarget: "this",
    library: "l",
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "esbuild-loader",
        options: {
          target: "es2020",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/appsscript.json" }],
    }),
  ],
};
