/**
 * Endpoints
 * Handles the routes and communication to public API
 */
var express = require('express');
var User = require('../models/user');
var Device = require('../models/device');

module.exports = (function() {
  'use strict';
  var api = express.Router();

  /**
   * Beginning of the world!
   */
  api

  // TODO: restrict to admin
  // Save user record
  .post('/', function(req, res) {

      var user = new User();

      // store the data needed
      for (var key in user) {
        if (key !== '_id' && key !== '__v' && key !== 'updated' && req.body[key]) {
          user[key] = req.body[key];
        }
      }

      // save the user
      user.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'User ' + req.body.name + ' created!' });
      });

  })

  // TODO: restrict to admin
  // Get all users
  .get('/', function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  })

  // Get a single user
  .get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err)
        res.send(err);

      res.json(user);
    });
  })

  // Update a single user
  .put('/:id', function(req, res) {
    // grab the instance
    User.findById(req.params.id, function(err, user) {
      if (err)
        res.send(err);

      // store the data needed
      for (var key in user) {
        if (key !== '_id' && key !== '__v' && key !== 'updated' && req.body[key]) {
          user[key] = req.body[key];
        }
      }

      // save the user
      user.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'User ' + req.params.id + ' updated!' });
      });

    });
  })

  // TODO: Test this!
  // add device to user
  .post('/:id', function(req, res) {

    // Validate the device exists
    Device.findById(req.params.id, function(err, device) {
      if (err)
        res.send(err);

      // grab the instance
      User.findById(req.params.id, function(err, user) {
        if (err)
          res.send(err);

        // store the data needed
        user[key] = req.body[key];

        // save the user
        user.save(function(err) {
          if (err)
            res.send(err);

          res.json({ message: 'User ' + req.params.id + ' updated!' });
        });
      });

    });
  })

  // TODO: restrict to admin
  // Delete a single User
  .delete('/:id', function(req, res) {
    User.remove({
      _id: req.params.id
    }, function(err, user) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  })

  /**
   * End of the world!
   */
  ;

  return api;
})();
