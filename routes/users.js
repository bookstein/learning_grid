var express = require('express');
var router = express.Router();

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'learning_grid_test'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource YAY');
});

// Router takes a request (req), response object (res), and a callback (next)
router.get('/:id', function (req, res, next) {
  // connect to database
  connection.query("SELECT * from user where id = " + req.params.id, function (err, rows) {
    if (err || !rows.length) {
      res.send("Cannot find this user!");
    }
    else {
      res.send(rows)
    }
  });
})
module.exports = router;
