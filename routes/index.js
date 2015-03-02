
/*
 * GET home page.
 */

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/live');

exports.addUser = function(req, res) {
  var collection = db.get('users'); 

  var hashed = passwordHash.generate(req.body.password)

  var newUser = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      cell : req.body.cell,
      email : req.body.email,
      hash : hashed
  };

  collection.insert(newUser, {}, function(err, records){
    if(err){
      res.end(error);
    } else {
      res.end(records);
    }
  });
};

exports.updateUser = function(req, res) {
  var collection = db.get('users');

  var hashed = passwordHash.generate(req.body.password)

  var user = {
    _id : req.body._id,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    cell : req.body.cell,
    email : req.body.email,
    hash : hashed
  }

  collection.update({_id : req.body._id}, user, {}, function(err, records){
    if(err){
      res.end(err);
    } else {
      res.end(records);
    }
  });
};

exports.loginUser = function(req, res){
  var collection = db.get('users');
  var em = req.body.email;
  var pswd = req.body.password;
  collection.find({email : em}, {}, function(err, records){
    if (err) {
      res.end("Error finding user email");
    } else {
      for (record in records) {
        if (passwordHash.verify(pswd, record.hash)) {
          res.json(record);
        } else {
          res.json("Invalid login");
        }
      }
    }
  });
};

exports.allUsers = function(req, res){
  var collection = db.get('users');
  collection.find({}, {}, function(err, records){
    if(err){
      res.json(err);
      res.end();
    } else {
      res.json(records);
      res.end();
    }
  });
};

