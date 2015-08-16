var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Device = new Schema({
    name: String,
    type: String
});

module.exports = mongoose.model('Device', Device);
