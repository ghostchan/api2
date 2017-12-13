const express = require("express");
const router = express.Router();
const mockjs=require('mockjs');
const dbConfig = require('../db/config');
const mysql = require("mysql");
router.post("/*", function(req, res) {
  var url = req.url;
  console.log(url);
  var post = "";
  //创建一个connection
  var connection = mysql.createConnection(dbConfig);
  //创建一个connection
  connection.connect(function(err) {
    if (err) {
      console.log("[query] - :" + err);
      return;
    }
    console.log("[connection connect]  succeed!");
  });

  var selRes = `select param from params where url ="${url}"`;
  connection.query(selRes,function(error, result) {
    if (error) {
      console.log(error.message);
    } else {
     if(!!result[0] && !!result[0].param){
        var mockData = mockjs.mock(JSON.parse(result[0].param.replace(/[\n]/g, ""))); //去掉换行 );
        console.log(JSON.stringify(mockData, null, 4));
        res.send(mockData);
     }else{
        res.send("{}");
     } 
    
      connection.end();
      
    }
  });
  
});
module.exports = router;


