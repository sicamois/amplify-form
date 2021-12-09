const isProductionMode = process.env.NODE_ENV === "production";
const path = require('path')
const pkg = require('./package.json');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  mode: isProductionMode ? "production" : "development",
  entry: "./src/index.tsx", // <- starting point for bundle 
  output: {
    path: path.resolve(__dirname, 'dist'), //<-where to save ur bundle 
    filename: "index.js", //<-filename for bundled file
    library: pkg.name,
    libraryTarget: "commonjs2" //<- to which version are we compiling js 
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
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'

        ],
      },
    ],
  },
  target: "node",
  plugins: [ new MiniCssExtractPlugin() ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: [nodeExternals()]
  // externals: {
  //   'aws-amplify': {
  //     commonjs: "aws-amplify",
  //     commonjs2: "aws-amplify",
  //   },
    // Don't bundle react or react-dom      
    // react: {
    //   commonjs: "react",
    //   commonjs2: "react",
    //   amd: "React",
    //   root: "React"
    // },
    // "react-dom": {
    //   commonjs: "react-dom",
    //   commonjs2: "react-dom",
    //   amd: "ReactDOM",
    //   root: "ReactDOM"
    // }
  // }
};