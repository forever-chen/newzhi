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
// 获取内容接口
// app.use(function(req,res){
//     res.setHeader("Content-Type","text/html;charset=utf-8")
// })
app.use('/getData',function(req,res){
    console.log(req.query.data,req.query.type);
    var data = require('./app/json/data.json');
    console.log(data.data.shenbao[req.query.type][req.query.data])
    res.send(data.data.shenbao[req.query.type][req.query.data])
})
app.use('/editor',function(req,res){
    res.sendFile(path.resolve(__dirname,'app/template/editor.html'))
})
app.use(bodyParser.json());
app.use('/index.html',function(req,res){
    res.sendFile(path.resolve(__dirname,'app/template/shenbao.html'))
})
app.use('/shenbao1',function(req,res){
    res.sendFile(path.resolve(__dirname,'app/template/shenbao1.html'))
})
app.use('/detail/*',function(req,res){
    var params = req._parsedOriginalUrl.path.slice(8)
    console.log(params)
    res.sendFile(path.resolve(__dirname,'app/template/detail.html'))
})
app.use('/',function(req,res){
    // console.log(req.url)
    res.sendFile(path.resolve(__dirname,'app/template/first.html'))
})

app.listen(port)