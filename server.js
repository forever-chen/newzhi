var http = require('http');
var port = 18080;
var express = require('express');
var app = express();
var path = require('path');
app.use('/',function(req,res){
    res.sendFile(path.resolve(__dirname,'app/template/index.html'))
})
app.listen(port)