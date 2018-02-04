const webpack = require("webpack");
const merge = require("webpack-merge");
const path = require("path");

var config = {
    output: {
        path: path.resolve(__dirname + "/dist/")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["vue-style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.sass$/,
                use: [
                    "vue-style-loader",
                    "css-loader",
                    "sass-loader?indentedSyntax"
                ]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                        scss: ["vue-style-loader", "css-loader", "sass-loader"],
                        sass: [
                            "vue-style-loader",
                            "css-loader",
                            "sass-loader?indentedSyntax"
                        ]
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]?[hash]"
                }
            }
        ]
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js"
        },
        extensions: ["*", ".js", ".vue", ".json"]
    },
    performance: {
        hints: false
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            mangle: true,
            compress: {
                warnings: false
            }
        })
    ]
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
