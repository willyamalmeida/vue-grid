const merge = require("webpack-merge");
const path = require("path");

let config = require("./webpack.config.js");

config.entry = path.resolve(__dirname + "/src/main.js");

config.output = {
    path: path.resolve(__dirname + "/dist/"),
    publicPath: "/dist/",
    filename: "build.js"
};

config.devServer = {
    inline: true,
    hot: true,
    open: true,
    port: 8080,
    progress: true,
    stats: {
        colors: true,
        reasons: true,
        modules: true,
        errorDetails: true
    },
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    proxy: {
        "/api": {
            target: "http://localhost:3000",
            secure: false
        }
    }
};

config.devtool = "#eval-source-map";

module.exports = config;
