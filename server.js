var http = require('http');

var port = 18080;
var fs = require('fs')
var express = require('express');
var formidable = require('formidable')
var app = express();
var multer = require('multer');
var path = require('path');
var fstream = require('fstream');
var tar = require('tar');
var zlib = require('zlib');
// http.createServer(function(req, res){  
//     // 发送 HTTP 头部  
//       // HTTP 状态值: 200 : OK  
//       // 内容类型: text/plain  
//       res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});  
//       // 发送响应数据 "Hello World"  
        
//   }).listen(8080);  
// app.use(express.static(path.resolve(__dirname, 'upload-files')));
// app.use(express.limit(100000000));
app.use(express.static(path.resolve(__dirname, 'app')))
// app.use(express.static(path.resolve(__dirname, 'app')))

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

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
    return;
})
// 获取文章内容列表接口
app.use('/getContent', function (req, res) {
    var dataJson = JSON.parse(fs.readFileSync('./app/detailJson/titleJson.json','utf-8'));
    // console.log(dataJson)
    res.send(dataJson[req.query.type][req.query.childType])
    return;
})
// 获取文章内容列表接口
app.use('/getAllContent', function (req, res) {
    var dataJson = JSON.parse(fs.readFileSync('./app/detailJson/titleJson.json','utf-8'));
    // console.log(dataJson)
    res.send(dataJson)
    return;
})
// 添加文章
app.post('/addContent', function (req, res) {
    var flag = true;
    // 一个参数是类别，另一个参数子类，还有保存数据
    var reqData = JSON.parse(req.body.data)
    
    var dataJson = JSON.parse(fs.readFileSync('./app/detailJson/titleJson.json','utf-8'))
    dataJson[reqData.type][reqData.childType].map(function(item,index){
        if(item.title == reqData.title){
            if(reqData.edit){
                // dataJson[reqData.type][reqData.childType][index].title
            }else{
                res.send('文章标题重复，请修改文章标题再次提交');
                flag = false;
                return;
            }
            
        }
    })
    if(flag){
        if(!reqData.edit){
            dataJson[reqData.type][reqData.childType].push({
                title:reqData.title,
                time:formatDate(new Date())
            })
        }
        fs.writeFileSync('./app/detailJson/titleJson.json',JSON.stringify(dataJson));
        fs.writeFileSync('./app/detailJson/'+reqData.type+'/'+reqData.title+'.txt',reqData.content);
        res.send('ok');
    }
    return;
    
})
// 删除文章
app.use('/deleteData', function (req, res) {
    // var reqData = JSON.parse(req.query)
    // console.log(req.query)
    var dataJson = JSON.parse(fs.readFileSync('./app/detailJson/titleJson.json','utf-8'))
    dataJson[req.query.type][req.query.childType].map(function(item,index){
        if(item.title==req.query.title){
            dataJson[req.query.type][req.query.childType].splice(index,1);   
        }
    })
    console.log(req.query.title) 
    fs.writeFileSync('./app/detailJson/titleJson.json',JSON.stringify(dataJson));
    var exist=fs.existsSync('./app/detailJson/'+req.query.type+'/'+req.query.title+'.txt')
    if(exist){
        fs.unlinkSync('./app/detailJson/'+req.query.type+'/'+req.query.title+'.txt');
        res.send('ok');
    }else{
        res.send('ok');
    }
    return;
})
// 文章详情页获取内容
app.use('/getDetailContent', function (req, res) {
    // console.log(req.query)
    var dirName = './app/detailJson/'+req.query.type+'/'+req.query.title+'.txt';
    // console.log(dirName)
    fs.exists(dirName,function(exists){
        if(exists){
            var rs=fs.createReadStream(dirName,'utf-8');
            var data='';
            rs.on('data',function(trunk){
                data+=trunk;
            })
            rs.on('end',function(){
                // console.log(data)
                res.send(data);
            })
        }else{
            res.send('<p>文章内容已经被删除……</p>');
        }
    })
    return;
    // var content = fs.readFileSync('./app/detailJson/'+req.query.title+'.txt','utf-8');
})






// app.use('/downLoadFile', function (req, res) {
//     const compressing = require('compressing');
//     compressing.tar.compressDir('./app/detailJson', './yasuo.tar');
//     // compressing.tgz.uncompress('./yasuo.tar', 'path/to/destination/dir')
// })


var fileList = [];
var fileName = [];
var prev = '';
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            // console.log(files)
            //遍历读取到的文件列表
            files.forEach(function(filename){
                // console.log(filename)
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        // console.log(stats)
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            fileList.push(filedir);
                            console.log(filePath)
                            if(filePath.indexOf('detailJson')!=='-1'){
                                prev =  filePath.split('\\')[filePath.split('\\').length-1];
                            }else{
                                prev =  'img';
                            }
                            fileName.push(prev+'-'+filename);
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            // console.log('hahhahahah')
                            // prev = filename;
                        }
                    }
                })
            });
        }
    });
    setTimeout(function(){
        compressFile()
        console.log(fileList,fileName)
    },10000)
}

function compressFile(){
    var ARCHIVER = require('archiver');
    // var FS = require('fs');
    var presentDate = new Date();
    var myDate = presentDate.toLocaleDateString();//获取当前日期，eg:2017-02-08，以此日期为压缩包文件名
    var files = fileList;//将图片路径组合成数组形式，用for循环遍历
    //压缩后文件输出地址：/ARCHIVER/appData/files/，压缩包名：eg：2017-02-08.zip
    var output = fs.createWriteStream('./yasuo' + '.zip');
    //archiver可压缩为zip或tar格式，这里选择zip格式，注意这里新定义了一个变量archive，而不是原有的archiver包引用
    var archive = ARCHIVER('zip', {
        store: true
    });
    //将压缩路径、包名与压缩格式连接
    archive.pipe(output);
    //nameInZIP指压缩包内的文件名
    var nameInZIP = fileName;
    for (var i = 0; i < files.length; i++) {
        // console.log(files[i]);
        //FS读取文件流并命名，将读取的文件流append到压缩包中
        archive.append(fs.createReadStream(files[i]), {'name': nameInZIP[i]});
    }
    //压缩结束
    archive.finalize();
}


app.use('/compress', function (req, res) {
    fileDisplay('./app/detailJson')
    fileDisplay('./app/upload-files')
})





// 文章内容下载
app.use('/downLoadFile', function (req, res) {
    // fstream.Reader({path:'./app/detailJson',type:'Directory'})
    // .pipe(tar.Pack({ noRepository: true, fromBase: true }))
    // .pipe(zlib.Gzip()).pipe(res)
    
    // var dirName = './app/detailJson/'+req.query.type+'/'+req.query.title+'.txt'
    var filePath = path.join(__dirname, './yasuo.zip');  
    var stats = fs.statSync(filePath);  
    var isFile = stats.isFile();  
    if(isFile){  
        res.set({  
            'Content-Type': 'application/octet-stream',  
            'Content-Disposition': 'attachment; filename=yasuo.zip'
            // 'Content-Length': stats.size  
        });  
        fs.createReadStream(filePath,{encoding:'utf-8'}).pipe(res);  
    } else {  
        res.end(404);  
    }  
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
// 路由
app.use('/editor', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'app/template/editor.html'))
})
app.use('/list',function(req,res){
    res.sendFile(path.resolve(__dirname, 'app/template/newsList.html'))

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

app.use('/', function (req, res) {
    console.log(req.url)
    res.sendFile(path.resolve(__dirname, 'app/template/first.html'))
})

app.listen(port)