const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const dbConfig = require("../db/config");
const mysql = require("mysql");
router.post("/", function(req, res) {
  var id = req.body.id;
  var desc = req.body.desc;
  var url = req.body.url;
  var param = req.body.param;
//   console.log(id, desc,url,param);

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

  var updateQuery = 'UPDATE params SET url=?,url_info=?,param=? WHERE id=?';
  var queryParam = [url,desc,param,id];
  connection.query(updateQuery, queryParam, function(error, result) {
    if (error) {
        res.send({"status":2,"msg":error.message});
      console.log(error.message);
    } else {
        res.send({"status":1,"msg":"更新成功！"});
        console.log("更新成功");
    }
    connection.end();
  });

});
module.exports = router;
