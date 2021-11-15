//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var infoDataSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        "Header": { type: String },
        "WindoxBox": { type: String },
        "OutdoorPlantPots": { type: String },
        "SmallGarden": { type: String },
        "LargeGarden": { type: String },
        "Allotment": { type: String },
        "FieldFields": { type: String },
        "BodyText": { type: String },
});

module.exports = mongoose.model("infoData", infoDataSchema, "infoData");