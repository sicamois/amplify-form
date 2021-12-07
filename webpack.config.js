const isProductionMode = process.env.NODE_ENV === "production";

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: isProductionMode ? "production" : "development",
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProductionMode ? "[name].[contenthash].css" : "[name].css",
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};