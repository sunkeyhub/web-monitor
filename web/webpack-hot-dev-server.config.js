/**
 * webpack开发配置(支持热替换)
 *
 * @author : Sunkey
 */
var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        app: [
            path.resolve(__dirname) + '/index.js'
        ],
    },
    output: {
        path: path.resolve(__dirname) + '/build',
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel?presets[]=react&presets[]=es2015'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'autoprefixer', 'sass']
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = config;
