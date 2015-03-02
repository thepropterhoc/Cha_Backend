
/*
 * GET home page.
 */

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/live');

exports.addUser = function(req, res) {
  var collection = db.get('users'); 

  var newUser = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      cell : req.body.cell
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

  var user = {
    _id : req.body._id,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    cell : req.body.cell
  }

  collection.update({_id : req.body._id}, user, {}, function(err, records){
    if(err){
      res.end(err);
    } else {
      res.end(records);
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

