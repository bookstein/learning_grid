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
router.get('/:id', function (req, res, next) {
  // connect to database
  connection.query("SELECT * from entity where id = " + req.params.id, function (err, rows) {
    if (err || !rows.length) {
      res.send("Cannot find this entity");
    }
    else {
      res.send(rows)
    }
  });
})
/* GET entities listing. */
router.get('/', function(req, res, next) {
  connection.query("SELECT * from entity", function (err, rows) {
    if (err || !rows.length) {
      res.send("Cannot find your entities");
    }
    else {
      res.send(rows)
    }
  });
});

// entity/new/entity
router.get('/new', function (req, res, next) {
  res.render('new_entity_form', { title: 'Learning Grid' });
})

router.post('/new', function (req, res, next) {
  connection.query("INSERT INTO entity (name, description, type) VALUES ( 'test23', 'a fun thing', 'topic')")
})

module.exports = router;
