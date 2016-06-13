/**
 * 前端开发服务器
 *
 * @author : Sunkey
 */
var express = require('express');
var app = express();
app.use(express.static('./'));
app.listen(8001);
/*
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack-hot-dev-server.config');

var host = '127.0.0.1';
var port = 8001;

webpackConfig.entry.app.unshift('webpack-dev-server/client?http://'+host+':'+port);
webpackConfig.entry.app.unshift('webpack/hot/only-dev-server');

new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    historyApiFallback: true,
    publicPath: '/build/'
}).listen(port, host, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('WebpackDevServer starting...');
    }
});
*/
