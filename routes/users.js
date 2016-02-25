var express = require('express');
var router = express.Router();

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'learning_grid_test'
})

// Router takes a request (req), response object (res), and a callback (next)

// GET users (LIST)
router.get('/', function(req, res, next) {
  res.send('the users listing is responding with a resource, YAY');
});

// GET users/:id (SHOW)
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
});


// GET users/:id/entities/:id (SHOW)
router.get('/:userId/entities/:entityId', function (req, res, next) {
  connection.query(
    'SELECT entity.*, user.* ' +
    'FROM user_entity ' +
    'INNER JOIN entity ' +
    'ON user_entity.entity_id = ' + req.params.entityId +
    ' INNER JOIN user ' +
    'ON user_entity.user_id = ' + req.params.userId +
    ' WHERE entity.id = ' + req.params.entityId,
    function (err, rows, fields) {
      if (err || !rows.length) {
        console.log("the error is: " + err)
        console.log("rows: " + rows)
        res.send('Couldn\'t find a matching entity for this user!')
      } else {
        res.send(rows);
      }
  });
});

// less specific: put it later in the routes file! (matching)
// GET users/:id/entities (LIST)
router.get('/:id/entities', function (req, res, next) {
  connection.query(

    //select entity.* from user_entity join entity on entity.id = user_entity.entity_id where user_entity.user_id = 1;

    'SELECT entity.* ' +
    'FROM user_entity ' +
    'INNER JOIN entity ' +
    'ON user_entity.entity_id = entity.id ' +
    'WHERE user_entity.user_id = ' + req.params.id,
    function (err, rows, fields) {
      if (err || !rows.length) {
        console.log("error:" + err);
        res.send('Couldn\'t find a matching entity for this user!')
      } else {
        res.send(rows);
      }
  });
});

module.exports = router;
