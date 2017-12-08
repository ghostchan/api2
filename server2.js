const express=require('express');
const static=require('express-static');

const bodyParser=require('body-parser');
const consolidate=require('consolidate');

var server=express();
server.listen(8080);


//3、post数据
server.use(bodyParser.urlencoded({extended:false}));


//4、配置模板引擎
//输出什么东西
server.set('view engine','html');
//模板文件放在哪儿
server.set('views','./views');
//哪种模板引擎
server.engine('html',consolidate.ejs);

//接收用户请求
server.get('/',function(req,res){
    res.render('index.ejs',{name:'chen'}); 
});
server.get('/list',function(req,res){
    res.render('list.ejs',{}); 
});
server.post('/add',function(req,res){
    console.log(req.body.desc);
});

//4、static数据
server.use(static('./static'));