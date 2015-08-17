var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Device = new Schema({
  capabilities: [String],
  name: String,
  status: String,
  type: String
});

module.exports = mongoose.model('Device', Device);
