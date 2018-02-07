const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("./webpack.dev.config");

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, config.devServer);

server.listen(config.devServer.port, function() {
    console.log(`Service init: http://localhost:${config.devServer.port}`);
});

// api
const jsonServer = require("json-server");
const api = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

api.use(middlewares);
api.use(router);

api.listen(3000, function() {
    console.log("JSON Server is running");
});
