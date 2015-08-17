/**
 * Session
 * Handles all requests, verify we have IoT only devices
 */
var config = require('../config/config.json');
var requiredHeaders = ['Accept', 'Authorization', 'Content-Type', 'X-Requested-With'];
var errorMessages = {
  '01': 'Missing Headers',
  '02': 'Missing Credentials',
};

// TODO: setup REAL token support ;)
var Session = function(req, res, next) {
  var error = false;
  var errorMsg = '';

  // compare the config session headers with the request
  for (var i = 0; i < requiredHeaders.length; i++) {
    var item = requiredHeaders[i];
    var header = req.headers[item.toLowerCase()];

    if (header === undefined || header !== config.session[item]) {
      error = true;
      errorMsg = (item === 'Authorization' || item === 'X-Requested-With') ? errorMessages['02'] : errorMessages['01'];
    }
  }

  // nope, we has problem
  if (error === true) {
    res.status(401).send({ success: false, message: 'Unauthorized - ' + errorMsg });
    return;
  }

  // everything is okay, continue
  next();
};

module.exports = Session;
