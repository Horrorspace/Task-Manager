const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;


module.exports = {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: {
        app: './src/main/client/pages/index.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './build/src/main/client'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/main/client/static/favicon.ico'),
                    to: path.resolve(__dirname, 'build/src/main/client')
                },
                {
                    from: path.resolve(__dirname, 'src/main/client/static/main.html'),
                    to: path.resolve(__dirname, 'build/src/main/client')
                },
                {
                    from: path.resolve(__dirname, 'src/main/client/static/img/Path 14.svg'),
                    to: path.resolve(__dirname, 'build/src/main/client/img')
                }
            ],
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.sass', '.html'],
        alias: {
            '@scss': path.resolve(__dirname, './src/main/client/static/scss'),
        }
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        
                    }
                },
                'css-loader',
                'sass-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                }
            },
        ],
    },
}