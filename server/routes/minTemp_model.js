// These coordinates relate to the British National Grid (BNG)

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var minTempSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    x: {type: Number}, 
    y: {type: Number}, 
    hardiness: {type: String}
});

module.exports = mongoose.model("minTempData", minTempSchema, "minTempData");