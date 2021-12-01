//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ourAdvice = new Schema({
    "Header": {type: String},
    "Pathname": {type: String},
    "Name": {type: String},
    "Username": {type: String},
    "Copyright": {type: String},
    "Link": {type: String}
});

const ourProperties = new Schema({
    "email": {type: String},
    "savedAdvice": {type: [ourAdvice]},
});

const ourGeometry = new Schema({
    "type": {type: String, enum: ['Point'], required: true},
    "coordinates": {type: [Number]}
});

const userDataSchema = new Schema({
    "type": {type: String},
    "properties": {type: ourProperties},
    "geometry": {type: ourGeometry}
});

userDataSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model("userData", userDataSchema, "userData");