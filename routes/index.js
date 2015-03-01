
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
      res.end('{"error" : "something went terribly wrong", "status" : 500}');
    } else {
      res.end('{"success" : "Updated Successfully", "status" : 200}');
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
      res.json(err);
      res.end();
    } else {
      res.json(records);
      res.end();
    }
  });
}

exports.index = function(req, res){
  res.render('index')
};