var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var grantExpress = require('grant-express');
var grant = new grantExpress('./config.json');
var session = require('express-session');
var request = require('request');
var crypto = require('crypto');
//var jwt = require('express-jwt');
var jsonwebtoken = require('jsonwebtoken');
var database = require('./config/database');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');
require('./config/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');
var apis = require('./routes/apis');
var twitter = require('./routes/twitter');
var secret = 'shhhhhhared-secret';
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('base', '/social');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(grant);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: database.secret }));
app.use(passport.initialize());



mongoose.connect(database.url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('connected');
})


app.use('/social', routes);
app.use('/users', users);
app.use('/api', apis);
app.use('/twitter', twitter);
//app.use('/api', jwt({ secret: secret }))

app.get('/partials/:name', function (req, res) {
  res.render('partials/' + req.params.name);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
