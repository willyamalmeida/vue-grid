const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: path.resolve(__dirname + "/src/main.js"),

    output: {
        path: path.resolve(__dirname + "/dist/"),
        publicPath: "/dist/",
        filename: "build.js"
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
            '/api': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    },

    devtool: "#eval-source-map",

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
