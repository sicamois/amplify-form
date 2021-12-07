const isProductionMode = process.env.NODE_ENV === "production";

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  mode: isProductionMode ? "production" : "development",
  entry: './src/components/AmplifyForm/index.ts',
  output: {
    filename: 'AmplifyForm.js',
    path: path.resolve('lib'),
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // Run `postcss-loader` on each CSS `@import` and CSS modules/ICSS imports, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
              // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
        // use: [
        //   isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
        //   'css-loader',
        //   'postcss-loader'
        // ],
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
  externals: {
    'aws-amplify': {
      commonjs: "aws-amplify",
      commonjs2: "aws-amplify",
    },
    // Don't bundle react or react-dom      
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
};