const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');


module.exports = {
entry: {
// popup: './src/assets/html/js/popup.js',
// background: './src/assets/js/background.js',
chromeManifest: './src/master.css'
},
plugins: [

// Clean the dist folder before building
new CleanWebpackPlugin({cleanStaleWebpackAssets: true}),

// Copy all files from src to dist
new CopyWebpackPlugin({
patterns: [
{from: 'src'}
],
}),

// Add hashes the CSS files for cache busting
new MiniCssExtractPlugin(),

// Analyse final package size
// new BundleAnalyzerPlugin({
// analyzerMode: 'static',
// logLevel: 'info',
// })
],
module: {
rules: [
{
test: /\.js?$/,
exclude: /node_modules/,
use: {
loader: 'babel-loader',
options: {
presets: ['@babel/preset-env']
}
},
},

// Prefix the CSS files
{
test: /\.css$/,
// use:['style-loader','css-loader']
use: [
MiniCssExtractPlugin.loader,
'css-loader',
'postcss-loader'

]
},

// Minify the CSS files
// {
// test: /\.css$/,
// use: [
// MiniCssExtractPlugin.loader,
// 'css-loader'
// ]
// },

// Test for html files for minification
{
test: /\.html$/i,
type: 'asset/resource',
},

// Test for json files for minification
{
test: /\.json$/i,
type: 'asset/resource',
},
]
},
resolve: {
extensions: ['.tsx', '.ts', '.js', '.css'],
},
optimization: {
minimize: true,
minimizer: [
// Minimise all the CSS files
// new CssMinimizerPlugin({
// exclude: ['/node_modules/', '/assets/fonts/']
// }),

new CssMinimizerPlugin(),

// Minimise all the HTML files
new HtmlMinimizerPlugin(),

// Minimise all the json files
new JsonMinimizerPlugin(),
],
},
output: {filename: '[name].js', path: path.resolve(__dirname, 'dist')},
};