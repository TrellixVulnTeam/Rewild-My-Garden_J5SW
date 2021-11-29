//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ourAdvice = new Schema({
    "Header": { type: String },
    "Pathname": { type: String },
    "Name": { type: String },
    "Username": { type: String },
    "Copyright": { type: String },
    "Link": { type: String }
})

var ourProperties = new Schema({
      "email": { type: String },
      "savedAdvice": { type: [ ourAdvice ] },
});

var ourGeometry = new Schema({
    "type": { type: String, enum: ['Point'], required: true },
    "coordinates": { type: [ Number ] }
});

var userDataSchema = new Schema({
    "type": { type: String },
    "properties": { type: ourProperties },
    "geometry": { type: ourGeometry }
});

userDataSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("userData", userDataSchema, "userData");