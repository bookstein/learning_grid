var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var routes = require('./routes/index');
var users = require('./routes/users');
var entity = require('./routes/entity');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

// database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : process.env.MYSQL_ROOT_PASSWORD
});

// connection.query('USE learning_grid_test');
connection.query('CREATE DATABASE IF NOT EXISTS learning_grid_test', function (err) {
  if (err) throw err;
  connection.query('USE learning_grid_test', function (err) {
    if (err) throw err;
    connection.query('CREATE TABLE IF NOT EXISTS user('
      + 'id INT NOT NULL AUTO_INCREMENT,'
      + 'name VARCHAR(60),'
      + 'PRIMARY KEY(id)'
      +  ')', function (err) {
          if (err) throw err;
      });
    connection.query('CREATE TABLE IF NOT EXISTS entity ('
      + 'id INT NOT NULL AUTO_INCREMENT,'
      + 'name VARCHAR(60),'
      + 'description VARCHAR(900),'
      + 'type VARCHAR(60),'
      + 'PRIMARY KEY (id)'
      + ')', function (err) {
          if (err) throw err;
      });
    connection.query('CREATE TABLE IF NOT EXISTS user_entity ('
      + 'user_id INT NOT NULL,'
      + 'entity_id INT NOT NULL,'
      + 'zone VARCHAR(60),'
      + 'FOREIGN KEY (user_id) REFERENCES user(id),'
      + 'FOREIGN KEY (entity_id) REFERENCES entity(id),'
      + 'PRIMARY KEY (user_id, entity_id)'
      + ')', function (err) {
          if (err) throw err;
      });
    connection.query('CREATE TABLE IF NOT EXISTS comment ('
      + 'id INT NOT NULL AUTO_INCREMENT,'
      + 'user_id INT NOT NULL,'
      + 'entity_id INT NOT NULL,'
      + 'text VARCHAR(140),'
      + 'FOREIGN KEY (user_id) REFERENCES user(id),'
      + 'FOREIGN KEY (entity_id) REFERENCES entity(id),'
      + 'PRIMARY KEY (id)'
      + ')', function (err) {
          if (err) throw err;
      });
  });
});


// extended: false means that we can only send strings or arrays
// in the query string
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/entity', entity);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}



module.exports = app;
