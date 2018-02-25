var http = require('http');
var port = 18080;
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.resolve(__dirname,'app')))
app.use('/shenbao',function(req,res){
    res.sendFile(path.resolve(__dirname,'app/template/shenbao.html'))
})
app.use('/',function(req,res){
    console.log(req.url)
    res.sendFile(path.resolve(__dirname,'app/template/index.html'))
})

app.listen(port)