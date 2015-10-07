/**
 * Created by Rex on 15/10/7.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.all('/*', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080);