//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const adviceSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        "Header": {type: String},
        "WindoxBox": {type: String},
        "OutdoorPlantPots": {type: String},
        "SmallGarden": {type: String},
        "LargeGarden": {type: String},
        "Allotment": {type: String},
        "FieldFields": {type: String},
        "ChildFriendly": {type: String},
        "Cheap": {type: String},
        "Easy": {type: String},
        "Renting": {type: String},
        "PavedGardens": {type: String},
        "Hedgehogs": {type: String},
        "Birds": {type: String},
        "Insects": {type: String},
        "Amphibians": {type: String},
        "Justification": {type: String},
        "BodyText": {type: String},
        "Pathname": {type: String},
        "Name": {type: String},
        "Username": {type: String},
        "Copyright": {type: String},
        "Link": {type: String},
});

module.exports = mongoose.model("adviceFinal", adviceSchema, "adviceFinal");