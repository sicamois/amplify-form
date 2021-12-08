const isProductionMode = process.env.NODE_ENV === "production";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = {
  mode: isProductionMode ? "production" : "development",
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
  plugins: [
    new MiniCssExtractPlugin(),
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
  }
};