/* global require module __dirname */

const libraryFileName = 'lay-em';
const libraryName = 'layEm';

const sourceDir = 'src';
const outputDir = 'build';

const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const clean = new CleanWebpackPlugin([outputDir]);

const extractCSS = new ExtractTextPlugin('styles/' + libraryFileName + '.css');

module.exports = {
    mode: 'development',
    entry: {
        [libraryFileName]: './' + sourceDir + '/scripts/' + libraryFileName + '.js'
    },
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                            publicPath: '../'
                        }
                    }
                ]
            },
            {
                test: /\.(less|css)$/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        clean,
        extractCSS
    ],
    output: {
        filename: 'scripts/[name].js',
        path: path.resolve(__dirname, outputDir),
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        jquery: {
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: 'jquery',
            root: '$'
        }
    }
};
