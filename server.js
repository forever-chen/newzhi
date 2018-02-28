var http = require('http');
var port = 18080;
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.resolve(__dirname,'app')))
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use('/editor',function(req,res){
    res.sendFile(path.resolve(__dirname,'app/template/editor.html'))
})
app.use(bodyParser.json());
app.use('/shenbao',function(req,res){
    res.sendFile(path.resolve(__dirname,'app/template/shenbao.html'))
})
app.use('/detail/*',function(req,res){
    var params = req._parsedOriginalUrl.path.slice(8)
    console.log(params)
    res.sendFile(path.resolve(__dirname,'app/template/detail.html'))
})
app.use('/',function(req,res){
    console.log(req.url)
    res.sendFile(path.resolve(__dirname,'app/template/index.html'))
})

app.listen(port)