var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config     = require('./config/config.json');
var Session    = require('./modules/session');
var Device     = require('./modules/device');
var Devices    = require('./modules/devices');

// setup the DB connection
mongoose.connect('mongodb://' + config.mongo.username + ':' + config.mongo.password + config.mongo.instance);

// setup the middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// router handlers, uses Session middleware
app.use('/api/devices', Session, Devices);

// base server setup
var port = process.env.PORT || config.server.port;

// catchall
app.use('*',function(req, res) {
  res.status(404).send('404');
});

// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('EllIoT started on port ' + port);
