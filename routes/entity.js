var express = require('express');
var router = express.Router();

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: 'learning_grid_test'
})

// GET /entities/new/
router.get('/new', function (req, res, next) {
  res.render('new_entity_form', { title: 'Learning Grid' });
});

// POST /entities/new
router.post('/new', function (req, res, next) {
  console.log(req.body)
  connection.query("INSERT INTO entity (name, description, type) VALUES ( '"
  + req.body.name + "', '"
  + req.body.description + "', '"
  + req.body.entityType + "');");
  res.redirect(201, "/")
});

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
//  GET /entities
router.get('/', function(req, res, next) {
  connection.query("SELECT * from entity", function (err, rows) {
    if (err || !rows.length) {
      res.send("Cannot find your entities");
    }
    else {
      // res.render('index', {title: 'Learning Grid'})
      res.send(rows)
    }
  });
});

module.exports = router;
