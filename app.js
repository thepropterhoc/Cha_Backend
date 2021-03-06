var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var https = require('https');
var crypto = require('crypto');
var stripe = require("stripe")(
  "sk_test_JdN9Bkldmcfj2l7YclFBPVY7"
);

var routes = require('./routes/index');
var users = require('./routes/users');

var fs = require("fs");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/users/add', routes.addUser);
app.post('/users/update', routes.updateUser);
app.get('/users/all', routes.allUsers);
app.post('/users/login', routes.loginUser);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

https.createServer({
    key: fs.readFileSync('~/.ssh/id_rsa'),
    certificate: fs.readFileSync(path.resolve(__dirname, 'g3.crt')),
    ca: [fs.readFileSync(path.resolve(__dirname, 'gd1.crt')), fs.readFileSync(path.resolve(__dirname, 'gd2.crt'))]
}, app).listen(1000);