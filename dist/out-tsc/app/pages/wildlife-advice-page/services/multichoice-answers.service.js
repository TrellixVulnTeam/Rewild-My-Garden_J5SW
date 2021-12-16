import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//Could use this data to create a "users near you have save said they have X soil type" response ******
let WildlifeAnswers = class WildlifeAnswers {
    constructor() {
        this.updatedAnswers = new Subject();
    }
    getAnswerUpdateListener() {
        return this.updatedAnswers.asObservable();
    }
    addAnswerSet(soilAnswer, phAnswer, shadeAnswer, sizeAnswer, childFriendlyAnswer, cheapAnswer, easyAnswer, rentingAnswer, pavedGardensAnswer) {
        const ourAnswer = {
            soil: this.getSoilString(soilAnswer),
            ph: this.getPHString(phAnswer),
            shade: this.getShadinessString(shadeAnswer),
            gardenSize: this.getGardenSizeString(sizeAnswer),
            childFriendly: childFriendlyAnswer,
            cheap: cheapAnswer,
            easy: easyAnswer,
            renting: rentingAnswer,
            pavedGardens: pavedGardensAnswer
        };
        //This is the equivalent of .emit- it sets a copy of the posts after they have been updated
        //The three methods that can be called on our observable are .next(), .error() and .complete()
        this.updatedAnswers.next(ourAnswer);
    }
    //convert the answers from the multichoice to the form we need them in to search our database
    //******** this currently converts the answers to a database form and then in disaply-user-response it converts them
    //back again. This is an obvious thing to change.
    //If a user inputs 'I don't know' just give them medium as this is most likely to be correct. If we have more
    //time at any point, it would be better to give them ALL soil options rather than making a choice for them. *********
    getSoilString(soil) {
        if (soil == "Light Soil") {
            return "SoilLight";
        }
        else if (soil == "Medium-Weight Soil") {
            return "SoilMedium";
        }
        else if (soil == "I Don't Know") {
            return "SoilMedium";
        }
        else {
            return "SoilHeavy";
        }
    }
    getPHString(PH) {
        if (PH == "Acidic Soil") {
            return "PHAcid";
        }
        else if (PH == "Neutral Soil") {
            return "PHNeutral";
        }
        else if (PH == "I Don't Know") {
            return "PHNeutral";
        }
        else {
            return "PHBasicAlkaline";
        }
    }
    //********* see note on 'getSoilString' above
    getShadinessString(shadiness) {
        if (shadiness == "Heavy Shade") {
            return "ShadeFull";
        }
        else if (shadiness == "Medium Shade") {
            return "ShadeSemi";
        }
        else if (shadiness == "Multiple Levels of Shadiness") {
            return "ShadeSemi";
        }
        else {
            return "ShadeNone";
        }
    }
    getGardenSizeString(size) {
        if (size == "A Window Box") {
            return "WindoxBox";
        }
        else if (size == "Plant Pots Outside on a Patio or Balcony") {
            return "OutdoorPlantPots";
        }
        else if (size == "A Small Garden") {
            return "SmallGarden";
        }
        else if (size == "A Large Garden") {
            return "LargeGarden";
        }
        else if (size == "An Allotment") {
            return "Allotment";
        }
        else {
            return "FieldFields";
        }
    }
};
WildlifeAnswers = __decorate([
    Injectable({ providedIn: 'root' })
], WildlifeAnswers);
export { WildlifeAnswers };
//# sourceMappingURL=multichoice-answers.service.js.map