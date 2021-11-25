// // These coordinates relate to the British National Grid (BNG)
// //This data model is holding repeat data- this would be worth fixing when there's time

// //Require Mongoose
// var mongoose = require('mongoose');

// //Define a schema
// var Schema = mongoose.Schema;

// var propertiesSchema = new Schema({
//     "y": {type: Number}, 
//     "x": {type: Number}, 
//     "hardiness": {type: String}
// });

// var geometrySchema = new Schema({
//     "type": {type: String}, 
//     "coordinates": {type: [Number]}
// });

// var minTempSchema = new Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     type: {type: String}, 
//     properties: propertiesSchema, 
//     geometry: geometrySchema
// });

// minTempSchema.index({loc : "2dsphere"});

// module.exports = mongoose.model("minTempDataGeo", minTempSchema, "minTempDataGeo");