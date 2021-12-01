// These coordinates relate to the British National Grid (BNG)

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const minTempSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    x: {type: Number},
    y: {type: Number},
    hardiness: {type: String}
});

module.exports = mongoose.model("minTempData", minTempSchema, "minTempData");