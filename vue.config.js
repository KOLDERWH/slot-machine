const path = require("path");
const fs = require("fs");
// const resolve = dir => path.join(__dirname, dir);

module.exports = {

    module: {
        rules: [
            {
                test: /\(.png|jpe?g)/,
                type: "asset",
            }
        ]
    }
};