var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Trigger = new Schema({
  type: String,
  deviceId: String,
  execute: Number,
  actions: [Schema.Types.Mixed],
});

module.exports = mongoose.model('Trigger', Trigger);
