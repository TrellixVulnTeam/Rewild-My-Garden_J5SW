//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const infoSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        "Title": {type: String},
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
        "Special": {type: String},
        "Hedgehogs": {type: String},
        "Birds": {type: String},
        "Insects": {type: String},
        "Amphibians": {type: String},
        "BodyText": {type: String},
});

module.exports = mongoose.model("infoFinal", infoSchema, "infoFinal");