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
        app: './src/client/index.tsx',
    },
    output: {
        filename: 'public/js/[name].js',
        path: path.resolve(__dirname, './build/src/client'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Tasks',
            template: './src/client/assets/html/template.html',
            scriptLoading: 'defer',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/client/assets/img/ico/favicon.ico'),
                    to: path.resolve(__dirname, 'build/src/client/public/ico')
                },
                {
                    from: path.resolve(__dirname, 'src/client/assets/html/static/main.html'),
                    to: path.resolve(__dirname, 'build/src/client')
                },
                {
                    from: path.resolve(__dirname, 'src/client/assets/html/static/list.html'),
                    to: path.resolve(__dirname, 'build/src/client')
                },
                {
                    from: path.resolve(__dirname, 'src/client/assets/html/static/calendar.html'),
                    to: path.resolve(__dirname, 'build/src/client')
                },
                {
                    from: path.resolve(__dirname, 'src/client/assets/html/static/settings.html'),
                    to: path.resolve(__dirname, 'build/src/client')
                },
                {
                    from: path.resolve(__dirname, 'src/client/assets/html/static/AddTask.html'),
                    to: path.resolve(__dirname, 'build/src/client')
                },
                {
                    from: path.resolve(__dirname, 'src/client/assets/img/svg/Path 14.svg'),
                    to: path.resolve(__dirname, 'build/src/client/public/img')
                },
                {
                    from: path.resolve(__dirname, 'src/client/assets/img/svg/CompositeLayer.svg'),
                    to: path.resolve(__dirname, 'build/src/client/public/img')
                },
                {
                    from: path.resolve(__dirname, 'src/client/assets/img/svg/Path 19.svg'),
                    to: path.resolve(__dirname, 'build/src/client/public/img')
                },
                {
                    from: path.resolve(__dirname, 'src/client/assets/img/svg/Union 1.svg'),
                    to: path.resolve(__dirname, 'build/src/client/public/img')
                }
            ],
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'public/css/[name].css'
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', 'css', '.scss', '.sass', '.html'],
        alias: {
            '@api': path.resolve(__dirname, './src/client/api'),
            '@scss': path.resolve(__dirname, './src/client/assets/styles'),
            '@react': path.resolve(__dirname, './src/client/ui'),
            '@redux': path.resolve(__dirname, './src/client/store'),
            '@config': path.resolve(__dirname, './src/client/config'),
            '@core': path.resolve(__dirname, './src/client/core'),
            '@utilities': path.resolve(__dirname, './src/client/utilities'),
            '@interfaces': path.resolve(__dirname, './src/client/types'),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        
                    }
                },
                'css-loader']
            },
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
