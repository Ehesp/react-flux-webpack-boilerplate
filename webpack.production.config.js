var Webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'build');
var mainPath = path.resolve(__dirname, 'src', 'index.js');

var config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: mainPath,
    output: {
        path: buildPath,
        filename: '/dist/bundle-[hash].js'
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: [nodeModulesPath]
        }, {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=dist/[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }]
    },
    plugins: [
        function() {
            this.plugin("done", function(stats) {
                var htmlTemplate = path.join(__dirname, 'src', 'index.html');
                var htmlPathOut = path.join(__dirname, 'build', 'index.html');
                var template = fs.readFileSync(htmlTemplate, 'utf8');
                var html = template.replace('/build/bundle.js', `/dist/bundle-${stats.hash}.js`);
                fs.writeFile(htmlPathOut, html);
            });
        }
    ]
};

module.exports = config;