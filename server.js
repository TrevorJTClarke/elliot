var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config     = require('./config/config.json');
var Session    = require('./modules/session');
var Devices    = require('./modules/devices');
var Sensors    = require('./modules/sensors');
var Triggers   = require('./modules/triggers');

// setup the DB connection
mongoose.connect('mongodb://' + config.mongo.username + ':' + config.mongo.password + config.mongo.instance);

// setup the middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router handlers, uses Session middleware
app.use('/api/devices', Session, Devices);
app.use('/api/sensors', Session, Sensors);
app.use('/api/triggers', Session, Triggers);

// base server setup
var port = process.env.PORT || config.server.port;

// catchall
app.use('*', function(req, res) {
  res.status(404).send('404');
});

// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('EllIoT started on port ' + port);
