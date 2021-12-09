/* eslint-disable @typescript-eslint/no-var-requires */
// import "core-js/stable";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const regeneratorRuntime = require("regenerator-runtime/runtime");

module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties",
      ]
}