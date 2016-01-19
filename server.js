const express = require('express');
const app = express();
const path = require('path');
const httpProxy = require('http-proxy');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT || 4000 : 3000;
const publicPath = isProduction ? path.resolve(__dirname, 'build') : path.resolve(__dirname, 'src');

app.set("view options", {layout: false});
app.use(express.static(publicPath));

// We only want to run the workflow when not in production
if (!isProduction) {

    const Webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');
    const webpackConfig = require('./webpack.config.js');
    const proxy = httpProxy.createProxyServer();

    // First we fire up Webpack an pass in the configuration we
    // created
    var bundleStart = null;
    const compiler = Webpack(webpackConfig);

    // We give notice in the terminal when it starts bundling and
    // set the time it started
    compiler.plugin('compile', function() {
        console.log('Bundling...');
        bundleStart = Date.now();
    });

    // We also give notice when it is done compiling, including the
    // time it took. Nice to have
    compiler.plugin('done', function() {
        console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
    });

    const bundler = new WebpackDevServer(compiler, {

        // We need to tell Webpack to serve our bundled application
        // from the build path. When proxying:
        // http://localhost:3000/build -> http://localhost:8080/build
        publicPath: '/build/',

        // Configure hot replacement
        hot: true,

        historyApiFallback: true,

        // The rest is terminal configurations
        quiet: false,
        noInfo: true,
        stats: {
            colors: true
        }
    });

    // We fire up the development server and give notice in the terminal
    // that we are starting the initial bundle
    bundler.listen(8080, 'localhost', function () {
        console.log('Bundling project, please wait...');
    });


    // Any requests to localhost:3000/build is proxied
    // to webpack-dev-server
    app.all('/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });

    // It is important to catch any errors from the proxy or the
    // server will crash. An example of this is connecting to the
    // server when webpack is bundling
    proxy.on('error', function (e) {
        console.log('Could not connect to proxy, please try again...');
    });
}

app.all('*', function (req, res) {
    res.sendFile(`${publicPath}/index.html`);
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});