var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Sensor = new Schema({
  name: String,
  primitive: String,
  historyId: String,
  valueType: String,
  value: String,
  updated: {
    type: Date,
    default: (+new Date())
  }
});

module.exports = mongoose.model('Sensor', Sensor);
