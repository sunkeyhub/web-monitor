var express = require('express');
var app = express();

app.get('/api/page/list', function(req, res) {
    var pageList = require('./data/pages');

    res.header('Access-Allow-Origin', '*');
    res.json({code: 200, data: pageList}).end();
});

app.get('/api/stat/overview', function(req, res) {
    res.header('Access-Allow-Origin', '*');
    res.json({code: 200, data: 'overview'}).end();
});

app.get('/api/stat/timing', function(req, res) {
    res.header('Access-Allow-Origin', '*');
    res.json({code: 200, data: 'timing'}).end();
});

app.get('/api/stat/err', function(req, res) {
    res.header('Access-Allow-Origin', '*');
    res.json({code: 200, data: 'err'}).end();
});

app.listen(8002);
