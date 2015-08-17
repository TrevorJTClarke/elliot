var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Device = new Schema({
  capabilities: [String],
  name: String,
  sensors: [String],
  status: String,
  type: String,
  updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Device', Device);
