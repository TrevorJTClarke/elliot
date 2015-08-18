var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SensorHistory = new Schema({
  timestamp: Number,
  sensorId: String,
  value: Schema.Types.Mixed
});

module.exports = mongoose.model('SensorHistory', SensorHistory);
