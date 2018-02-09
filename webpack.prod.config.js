const merge = require("webpack-merge");
const path = require("path");

let config = require("./webpack.config.js");

config.output = {
    path: path.resolve(__dirname + "/dist/")
};

config.devServer = {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
};

module.exports = [
    merge(config, {
        entry: path.resolve(__dirname + "/src/plugin.js"),
        output: {
            filename: "vue-grid.min.js",
            libraryTarget: "window",
            library: "VueGrid"
        }
    }),

    merge(config, {
        entry: path.resolve(__dirname + "/src/components/VueGrid.vue"),
        output: {
            filename: "vue-grid.js",
            libraryTarget: "umd",
            library: "vue-grid",
            umdNamedDefine: true
        }
    })
];
