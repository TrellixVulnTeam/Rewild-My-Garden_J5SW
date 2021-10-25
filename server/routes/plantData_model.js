//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var plantDataSchema = new Schema({
        id: { type: String },     
        Latin_Name: { type: String }, 
        CommonName: { type: String }, 
        Habit: { type: String }, 
        Height: { type: String }, 
        Hardiness: { type: String }, 
        Growth: { type: String }, 
        Soil: { type: String }, 
        Shade: { type: String }, 
        Moisture: { type: String }, 
        PH: { type: String }, 
        FloweringStart: { type: String }, 
        FloweringEnd: { type: String }, 
        Edible: { type: String }, 
        Medicinal: { type: String }, 
        Other: { type: String }, 
});

module.exports = mongoose.model('plantData', plantDataSchema );