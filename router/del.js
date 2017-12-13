const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const dbConfig = require("../db/config");
const mysql = require("mysql");
router.post("/", function(req, res) {
  var id = req.body.id;

//   创建一个connection
  var connection = mysql.createConnection(dbConfig);
//   创建一个connection
  connection.connect(function(err) {
    if (err) {
      console.log("[query] - :" + err);
      return;
    }
    console.log("[connection connect]  succeed!");
  });

  var delQuery = 'DELETE FROM params WHERE id = ?';
  var queryParam = [id];
  connection.query(delQuery, queryParam, function(error, result) {
    if (error) {
        res.send({"status":2,"msg":error.message});
      console.log(error.message);
    } else {
        res.send({"status":1,"msg":"删除成功！"});
    }
    connection.end();
  });

});
module.exports = router;
