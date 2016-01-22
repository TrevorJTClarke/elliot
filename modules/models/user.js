var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var User = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  permissions: String,
  devices: [String],
  status: String,
  type: String,
  updated: {
    type: Date,
    default: (+new Date)
  }
});

module.exports = mongoose.model('User', User);
