const express=require('express');
const static=require('express-static');

const bodyParser=require('body-parser');
const consolidate=require('consolidate');
const favicon = require('serve-favicon')
const path = require('path')

const mysql = require("mysql");

//连接池
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "2008",
  database: "api"
});
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
    db.query("SELECT * FROM params", (err, data) => {
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
server.post('/add',function(req,res){
    var desc=req.body.desc;
    var url=req.body.apiurl;
    var param=req.body.param;
    console.log(desc);
    console.log(desc.trim());
    db.query(`INSERT INTO params VALUES("",${url},${desc},${param})`, (err, data) => {
        if (err) {
          console.log(err);
          res
            .status(500)
            .send("database error")
            .end();
        } else {
            console.log("添加成功！");
        }
    });
});

//4、static数据
server.use(static('./static'));