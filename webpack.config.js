const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'bootstrap',
    'jquery',
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'redux',
    'redux-thunk'
];

const config = {
    mode: 'development',
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[contenthash].js',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'build'),
        },
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
        compress: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                nodeModules: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'nodeModules',
                    chunks: 'all',
                    priority: 10
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 5
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: ['file-loader'],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest']
        // })
    ]
};

module.exports = config;