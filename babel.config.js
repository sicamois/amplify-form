/* eslint-disable @typescript-eslint/no-var-requires */
// import "core-js/stable";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const regeneratorRuntime = require("regenerator-runtime/runtime");

module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "entry",
                "corejs": "3.0"
            },
        ],
        [
            "@babel/preset-react",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-typescript",
    ],
    // "plugins": [
    //     "@babel/plugin-transform-runtime",
    //   ]
}