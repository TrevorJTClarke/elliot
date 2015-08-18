/**
 * Endpoints
 * Handles the routes and communication to public API
 */
var express = require('express');
var Sensor = require('./sensor');
var Record = require('./sensorHistory');

module.exports = (function() {
  'use strict';
  var api = express.Router();

  /**
   * Beginning of the world!
   */
  api

  // Save Sensor record
  .post('/', function(req, res) {

      var sensor = new Sensor();

      // store the data needed
      for (var key in sensor) {
        if (key !== '_id' && key !== '__v' && key !== 'updated' && req.body[key]) {
          sensor[key] = req.body[key];
        }
      }

      // save the Sensor
      sensor.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Sensor ' + req.body.name + ' created!' });
      });

  })

  // Get all Sensors
  .get('/', function(req, res) {
    Sensor.find(function(err, sensors) {
      if (err)
        res.send(err);

      res.json(sensors);
    });
  })

  // Get a single Sensor
  .get('/:id', function(req, res) {
    Sensor.findById(req.params.id, function(err, sensor) {
      if (err)
        res.send(err);

      res.json(sensor);
    });
  })

  // Update a single Sensor
  .put('/:id', function(req, res) {
    // grab the instance
    Sensor.findById(req.params.id, function(err, sensor) {
      if (err)
        res.send(err);

      // store the data needed
      for (var key in sensor) {
        if (key !== '_id' && key !== '__v' && key !== 'updated' && req.body[key]) {
          sensor[key] = req.body[key];
        }
      }

      // save the Sensor
      sensor.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Sensor ' + req.params.id + ' updated!' });
      });

    });
  })

  // Delete a single Sensor
  .delete('/:id', function(req, res) {
    Sensor.remove({
      _id: req.params.id
    }, function(err, sensor) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  })

  // Save Sensor record
  .post('/:id/records', function(req, res) {

      var record = new Record();

      record.value = req.body.value;
      record.sensorId = req.body.id;
      record.timestamp = (+new Date);

      // save the Sensor
      record.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Sensor ' + req.body.id + ' record created!' });
      });

  })

  // Get all Sensors Records
  .get('/:id/records', function(req, res) {
    Record.find({
      sensorId: req.params.id
    }, function(err, sensors) {
      if (err)
        res.send(err);

      res.json(sensors);
    });
  })

  /**
   * End of the world!
   */
  ;

  return api;
})();
