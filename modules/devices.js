/**
 * Endpoints
 * Handles the routes and communication to public API
 */
var express = require('express');
var Device = require('./device');

module.exports = (function() {
  'use strict';
  var api = express.Router();

  /**
   * Beginning of the world!
   */
  api

  // Save device record
  .post('/', function(req, res) {

      var device = new Device();

      // store the data needed
      device.name = req.body.name;

      // save the device
      device.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Device ' + req.body.name + ' created!' });
      });

  })

  // Get all devices
  .get('/', function(req, res) {
    Device.find(function(err, devices) {
      if (err)
        res.send(err);

      res.json(devices);
    });
  })

  // Get a single device
  .get('/:id', function(req, res) {
    Device.findById(req.params.id, function(err, device) {
      if (err)
        res.send(err);

      res.json(device);
    });
  })

  // Update a single device
  .put('/:id', function(req, res) {
    // grab the instance
    Device.findById(req.params.id, function(err, device) {
      if (err)
        res.send(err);

      device.name = req.body.name;

      // save the device
      device.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Device ' + req.params.id + ' updated!' });
      });

    });
  })

  // Delete a single Device
  .delete('/:id', function(req, res) {
    Device.remove({
      _id: req.params.id
    }, function(err, device) {
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
