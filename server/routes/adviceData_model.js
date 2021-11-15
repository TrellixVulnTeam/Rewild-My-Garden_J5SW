//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var adviceDataSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        "Header": { type: String },
        "WindoxBox": { type: String },
        "OutdoorPlantPots": { type: String },
        "SmallGarden": { type: String },
        "LargeGarden": { type: String },
        "Allotment": { type: String },
        "FieldFields": { type: String },
        "Justification": { type: String },
        "BodyText": { type: String },
        "Pathname": { type: String },
        "Name": { type: String },
        "Username": { type: String },
        "Copyright": { type: String },
        "Link": { type: String },
});

module.exports = mongoose.model("adviceData", adviceDataSchema, "adviceData");