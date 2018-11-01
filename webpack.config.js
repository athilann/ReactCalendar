const modoDev = process.env.NODE_ENV != "production";
const webpack = require('webpack');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js',
        publicPath: '/'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: './public',
        historyApiFallback: {
            index: "/"
        },
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            modules: path.resolve(__dirname + '/node_modules/')
        }
    },
    plugins: [new ExtractTextPlugin({
        filename: 'app.css'
    }), new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })],
    module: {
        rules: [{
                test: /.js[x]?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [ExtractTextPlugin.loader, 'css-loader', 'sass-loader']
            }, {
                test: /\.woff|.woff2|.ttf|.eot|.svg|.png|.jpg*.*$/,
                use: ['file-loader']
            },
        ],
    }
};