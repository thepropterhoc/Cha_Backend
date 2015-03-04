
/*
 * GET home page.
 */

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/live');
var passwordHash = require('password-hash');

exports.addUser = function(req, res) {
  var collection = db.get('users'); 

  collection.findOne({email: req.body.email}, function(err, records){
    if (records && records.email == req.body.email) {
      res.json("Email exists already");
      res.end(); 
    } else {
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
          res.json(error);
          res.end();
        } else {
          res.json(records);
          res.end();
        }
      });
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
  var pswd = req.body.password;
  var query = {email : req.body.email};
  console.log(query);
  collection.findOne({email : req.body.email}, function(err, record){
    if (err) {
      res.end("Error finding user email");
    } else if(record && record.email == req.body.email) {
      if (passwordHash.verify(pswd, record.hash) == true) {
        res.json(record);
      } else {
        res.json("Invalid login");
      }
    } else {
      res.json("Email not found");
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

