'use strict';

var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.use(User.isLoggedIn);

router.get('/', function(req, res) {
  User.findById(req.token._id, function(err, user) {
    if(err || !user) return res.status(400).send(err || 'User not found.');
    res.send(user.meals);
  });
});

router.post('/', function(req, res) {
  var meal = req.body; // {description: , calories: }
  User.findById(req.token._id, function(err, user) {
    if(err || !user) return res.status(400).send(err || 'User not found.');
    user.meals.push(meal);
    user.save(function(err, savedUser) {
      res.send(savedUser.meals);
    });
  });
});

module.exports = router;
