var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var config     = require('./config/config.json');
var Session    = require('./modules/session');
var Users      = require('./modules/routes/users');
var Devices    = require('./modules/routes/devices');
var Sensors    = require('./modules/routes/sensors');
var Triggers   = require('./modules/routes/triggers');

// setup the DB connection
mongoose.connect('mongodb://' + config.mongo.username + ':' + config.mongo.password + config.mongo.instance);

// Global Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all( config.server.basePath + '/*', Session);

// Modules
app.use( config.server.basePath + '/users', Users);
app.use( config.server.basePath + '/devices', Devices);
app.use( config.server.basePath + '/sensors', Sensors);
app.use( config.server.basePath + '/triggers', Triggers);

// catchall
app.use('*', function(req, res) {
  res.status(404).send('404');
});

// base server setup
var port = process.env.PORT || config.server.port;
// =============================================================================
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('EllIoT started on port ' + port);
