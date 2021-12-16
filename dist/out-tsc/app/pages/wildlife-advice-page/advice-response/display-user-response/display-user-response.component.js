import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
let DisplayUserResponseComponent = class DisplayUserResponseComponent {
    constructor(allAnswersService) {
        this.allAnswersService = allAnswersService;
        this.ourPollinatorsService = new Subscription();
        /**********************************************************************
       **********************************************************************
       ************** LOGIC TO DISPLAY A USER'S ANSWERS TO THEM *************
       **********************************************************************
       ***********************************************************************/
        this.ourSubheader = "";
        this.ourPollinatorsService = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers) => {
            this.ourSubheader = this.getOurSubheader(retrievedAnswers);
        }, err => {
            console.log(err);
        });
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.ourPollinatorsService.unsubscribe();
    }
    getOurSubheader(retrievedAnswers) {
        let tempSubheader = "";
        tempSubheader = tempSubheader + "<p> You said you have <b>" + this.getSoilString(retrievedAnswers.soil) + "</b>, <b>" + this.getPHString(retrievedAnswers.ph) + "</b>. " +
            "You said you have <b>" + this.getGardenSizeString(retrievedAnswers.gardenSize) + "</b>, which experiences <b>" + this.getShadinessString(retrievedAnswers.shade) + "</b>. From your location we worked out that plants with a USDA hardiness level of <b>" + retrievedAnswers.hardiness + "</b> or above should be able to thrive in your garden.<br>";
        tempSubheader = tempSubheader + this.getOptionsString(retrievedAnswers) + "</p>";
        return tempSubheader;
    }
    getSoilString(soil) {
        if (soil == "SoilLight") {
            return "Light-Weight";
        }
        else if (soil == "SoilMedium") {
            return "Medium-Weight";
        }
        else {
            return "Heavy-Weight";
        }
    }
    getPHString(PH) {
        if (PH == "PHAcid") {
            return "Acidic Soil";
        }
        else if (PH == "PHNeutral") {
            return "Neutral Soil";
        }
        else {
            return "Alkaline (Basic) Soil";
        }
    }
    getShadinessString(shadiness) {
        if (shadiness == "ShadeFull") {
            return "Heavy Shade";
        }
        else if (shadiness == "ShadeSemi") {
            return "Medium Shade";
        }
        else {
            return "No Shade";
        }
    }
    getGardenSizeString(size) {
        if (size == "WindoxBox") {
            return "A Window Box";
        }
        else if (size == "OutdoorPlantPots") {
            return "Outdoor Plant Pots";
        }
        else if (size == "SmallGarden") {
            return "A Small Garden";
        }
        else if (size == "LargeGarden") {
            return "A Large Garden";
        }
        else if (size == "Allotment") {
            return "An Allotment";
        }
        else {
            return "A Field or Multiple Fields";
        }
    }
    getOptionsString(retrievedAnswers) {
        let responseArray = [];
        if (retrievedAnswers.childFriendly != "") {
            responseArray.push("<b>Child-friendly</b>");
        }
        if (retrievedAnswers.cheap != "") {
            responseArray.push("<b>Cheap</b>");
        }
        if (retrievedAnswers.easy != "") {
            responseArray.push("<b>Easy</b>");
        }
        if (retrievedAnswers.renting != "") {
            responseArray.push("<b>Good for Renters</b>");
        }
        if (retrievedAnswers.pavedGardens != "") {
            responseArray.push("<b>Good for Paved Gardens</b>");
        }
        //If no choices were made, return an empty string
        if (responseArray.length == 0) {
            return "";
        }
        //If one choice was made, return it
        else if (responseArray.length == 1) {
            return "You said you were particularly interested in suggestions which were: " + responseArray[0];
        }
        else {
            let tempSubheader = "You said you were particularly interested in suggestions which were: ";
            for (let i = 0; i < (responseArray.length - 2); i++) {
                tempSubheader = tempSubheader + responseArray[i] + ", ";
            }
            tempSubheader = tempSubheader + responseArray[responseArray.length - 2] + " ";
            tempSubheader = tempSubheader + "and " + responseArray[responseArray.length - 1] + ".";
            return tempSubheader;
        }
    }
};
DisplayUserResponseComponent = __decorate([
    Component({
        selector: 'app-display-user-response',
        templateUrl: './display-user-response.component.html',
        styleUrls: ['./display-user-response.component.scss']
    })
], DisplayUserResponseComponent);
export { DisplayUserResponseComponent };
//# sourceMappingURL=display-user-response.component.js.map