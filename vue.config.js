const path = require("path");
// const fs = require("fs");
// const resolve = dir => path.join(__dirname, dir);

module.exports = {

    module: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src'),
            },
        },
        rules: [
            {
                test: /\.(png|jpe?g)$/,
                type: "asset",
            },
            {
                test: /\.(mp3|wav)$/i,
                type: 'asset/resource',
            },
        ]
    }
};