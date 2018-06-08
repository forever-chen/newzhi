var http = require('http');

var port = 18080;
var fs = require('fs')
var express = require('express');
const formidable = require('formidable')
var app = express();
var multer = require('multer');
var path = require('path');
http.createServer((req, res) => {  
    // 发送 HTTP 头部  
      // HTTP 状态值: 200 : OK  
      // 内容类型: text/plain  
      res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});  
      // 发送响应数据 "Hello World"  
        
  }).listen(8080);  
// app.use(express.static(path.resolve(__dirname, 'upload-files')));
// app.use(express.limit(100000000));
app.use(express.static(path.resolve(__dirname, 'app')))
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
// 获取内容接口
// app.use(function(req,res){
//     res.setHeader("Content-Type","text/html;charset=utf-8")
// })
var formatDate = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
};  

// 获取资料接口
app.use('/getData', function (req, res) {
    var data = require('./app/json/data.json');
    res.send(data.data.shenbao[req.query.type][req.query.data]);
})
// 获取文章内容接口
app.use('/getContent', function (req, res) {
    var dataJson = fs.readFileSync('./app/detailJson/titleJson.json','utf-8');
    console.log(dataJson)
    res.send(req.query.type?dataJson[req.query.type]:dataJson)
})
// 添加文章
app.post('/addContent', function (req, res) {
    // console.log(req.body)
    var reqData = JSON.parse(req.body.data)
    var dataJson = JSON.parse(fs.readFileSync('./app/detailJson/titleJson.json','utf-8'))
        // console.log( dataJson[reqData.type])
        if(!dataJson){
            dataJson={};
        }
        if(!dataJson[reqData.type]){
            dataJson[reqData.type]=[]
        }
        dataJson[reqData.type].unshift({
            title:reqData.title,
            time:formatDate(new Date())
        })
        console.log()
        fs.writeFile('./app/detailJson/titleJson.json',JSON.stringify(dataJson))
        fs.writeFile('./app/detailJson/'+reqData.type+'/'+reqData.title+'.txt',reqData.content)
        res.send('ok');
    ;
    
})
// 删除文章
app.use('/deleteData', function (req, res) {
    var dataJson = JSON.parse(fs.readFileSync('./app/detailJson/titleJson.json','utf-8'))
    dataJson[req.query.type].map(function(item,index){
        if(item.title==req.query.title){
            dataJson[req.query.type].splice(index,1);
        }
    })
    fs.writeFileSync('./app/detailJson/titleJson.json',JSON.stringify(dataJson))
    var exist=fs.existsSync('./app/detailJson/'+req.query.title+'.txt')
    if(exist){
        fs.unlinkSync('./app/detailJson/'+req.query.title+'.txt');
        res.send('ok');
    }else{
        res.send('ok');
    }
})
// 文章详情页获取内容
app.use('/getDetailContent', function (req, res) {
    var dirName = './app/detailJson/'+req.query.type+'/'+req.query.title+'.txt'
    console.log(dirName)
    fs.exists(dirName,function(exists){
        if(exists){
            var rs=fs.createReadStream(dirName,'utf-8');
            var data='';
            rs.on('data',function(trunk){
                data+=trunk;
            })
            rs.on('end',function(){
                console.log(data)
                res.send(JSON.stringify(data));
            })
        }else{
            res.send('<p>文章内容已经被删除……</p>');
        }
    })
    
    // var content = fs.readFileSync('./app/detailJson/'+req.query.title+'.txt','utf-8');

})
app.use('/editor', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'app/template/editor.html'))
})
app.use(bodyParser.json());
app.use('/index.html', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'app/template/shenbao.html'))
})
app.use('/shenbao1', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'app/template/shenbao1.html'))
})
app.use('/detail/*', function (req, res) {
    // var params = req._parsedOriginalUrl.path.slice(8)
    // console.log(params)
    console.log(11111111111111)
    res.sendFile(path.resolve(__dirname, 'app/template/detail.html'))
})
var util = {
    objForEach: function (obj, fn) {
        var key, result
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result = fn.call(obj, key, obj[key])
                if (result === false) {
                    break
                }
            }
        }
    }
}
app.use('/upload', function (req, res, err) {
    if(err){
        console.log(err);
    }
    var imgLinks = []
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) {
            return 'formidable, form.parse err'+err;
        }
        // 存储图片的文件夹
        const storePath = path.resolve(__dirname,'app' ,'upload-files')
        if (!fs.existsSync(storePath)) {
            fs.mkdirSync(storePath)
        }

        // 遍历所有上传来的图片
        util.objForEach(files, function(name, file){
            // 图片临时位置
            const tempFilePath = file.path 
            // 图片名称和路径
            const fileName = file.name
            const fullFileName = path.join(storePath, fileName)
            // 将临时文件保存为正式文件
            fs.renameSync(tempFilePath, fullFileName)
            // 存储链接
            imgLinks.push('../upload-files/' + fileName)
        })
        res.send({
            errno: 0,
            data: imgLinks
        })
    })
})


app.use('/', function (req, res) {
    // console.log(req.url)
    res.sendFile(path.resolve(__dirname, 'app/template/first.html'))
})

app.listen(port)