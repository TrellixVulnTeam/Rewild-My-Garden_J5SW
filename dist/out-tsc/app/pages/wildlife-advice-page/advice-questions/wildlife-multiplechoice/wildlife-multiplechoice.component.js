import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let WildlifeMultiplechoiceComponent = class WildlifeMultiplechoiceComponent {
    constructor(wildlifeAnswersService) {
        this.wildlifeAnswersService = wildlifeAnswersService;
        this.chosenSoilType = "";
        this.soilTypes = ['Light, Sandy Soil', 'Medium-Weight Soil', 'Heavy, Clay Soil', "I Don't Know"];
        this.chosenPHType = "";
        this.PHTypes = ['Acidic Soil', 'Neutral Soil', 'Alkaline Soil', "I Don't Know"];
        this.chosenShadeType = "";
        this.shadeTypes = ['No Shade', 'Medium Shade', 'Heavy Shade', 'Multiple Levels of Shadiness'];
        this.chosenSize = "";
        this.sizes = ['A Window Box', 'Plant Pots Outside on a Patio or Balcony', 'A Small Garden', 'A Large Garden', 'An Allotment', 'A Field or Multiple Fields'];
        this.errMessage = "";
        //multichoice checkbox question
        this.childFriendly = "";
        this.cheap = "";
        this.easy = "";
        this.renting = "";
        this.pavedGardens = "";
    }
    ngOnInit() {
        document.getElementById('intro').classList.remove('hiddenQ');
        document.getElementById('next-intro').classList.remove('hiddenQ');
    }
    startQuestionnaire() {
        //hide question one
        document.getElementById('intro').classList.add('hiddenQ');
        document.getElementById('next-intro').classList.add('hiddenQ');
        //show question two
        document.getElementById('question-one').classList.remove('hiddenQ');
        document.getElementById('next-one').classList.remove('hiddenQ');
    }
    tryNextOne() {
        if (this.chosenSize == "") {
            document.getElementById('errMessage').innerHTML = "Please answer this question to continue";
            return;
        }
        else {
            //hide question one
            document.getElementById('question-one').classList.add('hiddenQ');
            document.getElementById('next-one').classList.add('hiddenQ');
            document.getElementById('errMessage').innerHTML = "";
            //show question two
            document.getElementById('question-two').classList.remove('hiddenQ');
            document.getElementById('next-two').classList.remove('hiddenQ');
        }
    }
    tryNextTwo() {
        if (this.chosenSoilType == "") {
            document.getElementById('errMessage').innerHTML = "Please answer this question to continue";
            return;
        }
        else {
            //hide question two
            document.getElementById('question-two').classList.add('hiddenQ');
            document.getElementById('next-two').classList.add('hiddenQ');
            document.getElementById('errMessage').innerHTML = "";
            //show question three
            document.getElementById('question-three').classList.remove('hiddenQ');
            document.getElementById('next-three').classList.remove('hiddenQ');
        }
    }
    tryNextThree() {
        if (this.chosenPHType == "") {
            document.getElementById('errMessage').innerHTML = "Please answer this question to continue";
            return;
        }
        else {
            //hide question three
            document.getElementById('question-three').classList.add('hiddenQ');
            document.getElementById('next-three').classList.add('hiddenQ');
            document.getElementById('errMessage').innerHTML = "";
            //show question four
            document.getElementById('question-four').classList.remove('hiddenQ');
            document.getElementById('next-four').classList.remove('hiddenQ');
        }
    }
    tryNextFour() {
        if (this.chosenShadeType == "") {
            document.getElementById('errMessage').innerHTML = "Please answer this question to continue";
            return;
        }
        else {
            //hide question four
            document.getElementById('question-four').classList.add('hiddenQ');
            document.getElementById('next-four').classList.add('hiddenQ');
            document.getElementById('errMessage').innerHTML = "";
            //show question five
            document.getElementById('question-five').classList.remove('hiddenQ');
        }
    }
    tryNextFive() {
        //This question handles its own errors, so just transition questions
        //hide question five
        document.getElementById('question-five').classList.add('hiddenQ');
        document.getElementById('errMessage').innerHTML = "";
        //show question six
        document.getElementById('question-six').classList.remove('hiddenQ');
        document.getElementById('next-six').classList.remove('hiddenQ');
    }
    //Create 'multiple choice answers object' and send that to wildlife answers service
    tryNextSixAndSave() {
        return __awaiter(this, void 0, void 0, function* () {
            //This question doesn't have to have an answers, so no checking
            //A response is composed of the results from mutliple tick boxes!
            this.wildlifeAnswersService.addAnswerSet(this.chosenSoilType, this.chosenPHType, this.chosenShadeType, this.chosenSize, this.childFriendly, this.cheap, this.easy, this.renting, this.pavedGardens);
        });
    }
};
WildlifeMultiplechoiceComponent = __decorate([
    Component({
        selector: 'app-wildlife-multiplechoice',
        templateUrl: './wildlife-multiplechoice.component.html',
        styleUrls: ['./wildlife-multiplechoice.component.scss']
    })
], WildlifeMultiplechoiceComponent);
export { WildlifeMultiplechoiceComponent };
//# sourceMappingURL=wildlife-multiplechoice.component.js.map