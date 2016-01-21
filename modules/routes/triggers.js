/**
 * Endpoints
 * Handles the routes and communication to public API
 */
var express = require('express');
var Trigger = require('../models/trigger');

module.exports = (function() {
  'use strict';
  var api = express.Router();

  /**
   * Beginning of the world!
   */
  api

  // Add a trigger
  .post('/', function(req, res) {

      var trigger = new Trigger();

      // store the data needed
      trigger.actions  = req.body.actions; // the special operation data for the trigger to write
      trigger.execute  = req.body.execute || (+new Date); // the timestamp of the trigger to execute
      trigger.deviceId = req.body.deviceId; // the device to send the trigger
      trigger.type     = req.body.type; // the type of trigger

      // save the trigger
      trigger.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Trigger ' + req.body.type + ' created!' });
      });

  })

  // Get all triggers
  .get('/:id', function(req, res) {
    Trigger.find({
      deviceId: req.params.id
    }, function(err, triggers) {
      if (err)
        res.send(err);

      res.json(triggers);
    });
  })

  // Delete a single Trigger
  .delete('/:id', function(req, res) {
    Trigger.remove({
      _id: req.params.id
    }, function(err, trigger) {
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
