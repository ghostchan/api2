const express=require('express');
const static=require('express-static');
const mockRouter = require("./router/mock");
const addRouter = require("./router/add");
const selRouter = require("./router/sel");
const delRouter = require("./router/del");
const updateRouter = require("./router/update");
const bodyParser=require('body-parser');
const consolidate=require('consolidate');
const favicon = require('serve-favicon');
const path = require('path');
const cors=require('cors');
const dbConfig=require('./db/config');

const mysql = require("mysql");
// 使用 Mock
const Mock = require('mockjs');



const db = mysql.createConnection(dbConfig);
var server=express();
server.listen(8080);

server.use(favicon(path.join(__dirname, 'static', 'favicon.ico')))

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
    db.query("SELECT * FROM params order by id desc", (err, data) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .send("database error")
            .end();
        } else {
            res.render('list.ejs',{list:data}); 
        }
    });
    
});
server.use('/add',addRouter);
server.use('/del',delRouter);
server.use('/update',updateRouter);
//接口模拟
server.use("/mock", cors(),mockRouter);

//4、static数据
server.use(static('./static'));