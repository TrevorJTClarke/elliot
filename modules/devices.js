var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Devices   = new Schema({
    name: String,
    type: String
});

module.exports = mongoose.model('Devices', Devices);
