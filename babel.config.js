// import "core-js/stable";
// const regeneratorRuntime = require("regenerator-runtime/runtime");

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