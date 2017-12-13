const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const dbConfig = require("../db/config");
const mysql = require("mysql");
router.post("/", function(req, res) {
  var desc = req.body.desc;
  var url = req.body.apiurl;
  var param = req.body.param;
//   console.log(desc.trim(), url.trim(), param.trim());

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

  var addQuery = 'INSERT INTO params (url,url_info,param) values(?,?,?)';
  var param6 = [url.trim(),desc.trim(),param.trim()];
  console.log(param6);
  connection.query(addQuery, param6, function(error, result) {
    if (error) {
      console.log(error.message);
    } else {
      res.redirect('/list');
    }
    connection.end();
  });

});
module.exports = router;
