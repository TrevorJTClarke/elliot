/**
 * Endpoints
 * Handles the routes and communication to public API
 */
var express = require('express');
var Devices = require('./devices');

module.exports = (function() {
  'use strict';
  var api = express.Router();

  /**
   * Beginning of the world!
   */
  api

  .post('/device', function(req, res) {

      var device = new Devices();

      // store the data needed
      device.name = req.body.name;

      // save the device
      device.save(function(err) {
        if (err)
          res.send(err);

        res.json({ status: 'success', message: 'Device created!' });
      });

  })

  .get('/devices', function(req, res) {
    Devices.find(function(err, devices) {
      if (err)
        res.send(err);

      res.json(devices);
    });
  })

  /**
   * End of the world!
   */
  ;

  return api;
})();
