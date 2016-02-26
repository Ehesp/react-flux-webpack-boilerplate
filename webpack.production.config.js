const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'build');
const mainPath = path.resolve(__dirname, 'src', 'index.js');

const pathToReact = path.resolve(nodeModulesPath, 'react/dist/react.min.js');
const pathToReactDom = path.resolve(nodeModulesPath, 'react-dom/dist/react-dom.min.js');
const pathToReactObj = path.resolve(nodeModulesPath, 'react/lib/Object.assign');

const config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: mainPath,
    output: {
        path: buildPath,
        filename: '/dist/bundle.js'
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js'],
        alias: {
            'react/lib/Object.assign': pathToReactObj,
            'react': pathToReact,
            'react-dom': pathToReactDom
        },
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: [nodeModulesPath]
        }, {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=dist/images/[name]-[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }],
        noParse: [pathToReact]
    },
    plugins: [
        new ExtractTextPlugin('/dist/styles.css', {
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            templateContent: function () {
                var htmlTemplate = path.join(__dirname, 'src', 'index.html');
                var template = fs.readFileSync(htmlTemplate, 'utf8');
                return template.replace('<script src="/build/bundle.js"></script>', '');
            },
            hash: true,
            filename: 'index.html',
            inject: 'body' // Inject all scripts into the body
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ]
};

module.exports = config;
