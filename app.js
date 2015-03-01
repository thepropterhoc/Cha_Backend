var express = require('express')
  , routes = require('./routes');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/live');

var app = module.exports;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(function(req,res,next){
    req.db = db;
    next();
  });
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.post('/user/add', routes.addUser);
app.get('/user/update', routes.updateUser);


app.listen(1000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});