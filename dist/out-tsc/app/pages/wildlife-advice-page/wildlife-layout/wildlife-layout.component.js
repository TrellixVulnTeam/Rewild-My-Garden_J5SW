import { __decorate } from "tslib";
import { Component, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
let WildlifeLayoutComponent = class WildlifeLayoutComponent {
    constructor(allAnswersService, adviceService, infoService, httpClient) {
        this.allAnswersService = allAnswersService;
        this.adviceService = adviceService;
        this.infoService = infoService;
        this.httpClient = httpClient;
        /**********************************************************************
         **********************************************************************
         *** LOGIC TO HIDE/UNHIDE PAGE ELEMENTS AND CHOOSE ADVICE/INFO BOXES **
         **********************************************************************
         ***********************************************************************/
        //********** improve wrap on phones
        //*********** improve layout for those with very small gardens
        //THIS NEEDS CHANGING BECAUSE THE MAXIMUM NO OF PIECES OF ADVICE IS NOW GREATER !!!!
        this.multichoiceShow = true;
        this.responseShow = false;
        this.ourPollinatorsService = new Subscription();
        this.ourAdviceService = new Subscription();
        this.ourInfoService = new Subscription();
        this.specialInfoOne = { "Title": "", "Special": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "BodyText": "" };
        this.ourSpecialAdvice = [this.specialInfoOne];
        this.hedgehogAdviceOne = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.hedgehogAdviceTwo = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.hedgehogAdviceThree = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.hedgehogAdviceFour = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.ourHedgehogAdvice = [this.hedgehogAdviceOne, this.hedgehogAdviceTwo, this.hedgehogAdviceThree, this.hedgehogAdviceFour];
        this.hedgehogInfoOne = { "Title": "", "Special": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "BodyText": "" };
        this.ourHedgehogInfo = [this.hedgehogInfoOne];
        this.birdAdviceOne = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.birdAdviceTwo = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.birdAdviceThree = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.birdAdviceFour = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.birdAdviceFive = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.birdAdviceSix = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.ourBirdsAdvice = [this.birdAdviceOne, this.birdAdviceTwo, this.birdAdviceThree, this.birdAdviceFour, this.birdAdviceFive, this.birdAdviceSix];
        this.birdInfoOne = { "Title": "", "Special": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "BodyText": "" };
        this.birdInfoTwo = { "Title": "", "Special": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "BodyText": "" };
        this.ourBirdsInfo = [this.birdInfoOne, this.birdInfoTwo];
        this.insectAdviceOne = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceTwo = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceThree = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceFour = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceFive = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceSix = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceSeven = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceEight = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceNine = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceTen = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceEleven = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.insectAdviceTwelve = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.ourInsectsAdvice = [this.insectAdviceOne, this.insectAdviceTwo, this.insectAdviceThree, this.insectAdviceFour, this.insectAdviceFive, this.insectAdviceSix, this.insectAdviceSeven, this.insectAdviceEight, this.insectAdviceNine, this.insectAdviceTen, this.insectAdviceEleven, this.insectAdviceTwelve];
        this.insectInfoOne = { "Title": "", "Special": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "BodyText": "" };
        this.insectInfoTwo = { "Title": "", "Special": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "BodyText": "" };
        this.insectInfoThree = { "Title": "", "Special": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "BodyText": "" };
        this.ourInsectsInfo = [this.insectInfoOne, this.insectInfoTwo, this.insectInfoThree];
        this.frogAdviceOne = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.frogAdviceTwo = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.frogAdviceThree = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.frogAdviceFour = { "Header": "", "Hedgehogs": "", "Birds": "", "Insects": "", "Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": "" };
        this.ourFrogsAdvice = [this.frogAdviceOne, this.frogAdviceTwo, this.frogAdviceThree, this.frogAdviceFour];
        this.hedgehogCountAdvice = 0;
        this.birdCountAdvice = 0;
        this.insectCountAdvice = 0;
        this.frogCountAdvice = 0;
        this.hedgehogCountInfo = 0;
        this.birdCountInfo = 0;
        this.insectCountInfo = 0;
        this.NUM_FIRST_DISPLAY = 1;
        /**********************************************************************
         **********************************************************************
         ********* LOGIC TO HANDLE ADVICE THAT WILL BE SAVED AS GEOJSON ********
         **********************************************************************
         ***********************************************************************/
        //the user's longitude and latitude
        this.longitude = 0;
        this.latitude = 0;
        //array which holds saved advice 
        this.savedAdvice = [];
        this.ourPollinatorsService = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers) => {
            //Get location from retrievedAnswers
            this.longitude = retrievedAnswers.longitude;
            this.latitude = retrievedAnswers.latitude;
            document.getElementById('allresults').classList.remove('hiddenElem');
            this.multichoiceShow = false;
            this.responseShow = true;
        }, err => {
            console.log(err);
        });
        this.fetchAdvice();
        this.fetchInfo();
    }
    //********* 'special' message still does not display
    fetchAdvice() {
        this.ourAdviceService = this.adviceService.getAnswerUpdateListener().subscribe((retrievedAdvice) => {
            for (let i = 0; i < retrievedAdvice.length; i++) {
                if (retrievedAdvice[i].Hedgehogs == "Y") {
                    this.ourHedgehogAdvice[this.hedgehogCountAdvice] = retrievedAdvice[i];
                    //Only automatically display the first piece of advice- the rest will be displayed with 'see more'
                    if (this.hedgehogCountAdvice < this.NUM_FIRST_DISPLAY) {
                        //If there is a piece of hedgehog advice to show, show title and 'see more' button
                        //It's in this 'if' because we don't want it called too many times unecessarily
                        document.getElementById('hedgehogTitle').classList.remove('hiddenElem');
                        document.getElementById('hedgehogButton').classList.remove('hiddenElem');
                        //Show first piece of advice
                        document.getElementById('hedgehogAdviceID' + this.hedgehogCountAdvice).classList.remove('hiddenElem');
                    }
                    this.hedgehogCountAdvice++;
                }
                if (retrievedAdvice[i].Birds == "Y") {
                    this.ourBirdsAdvice[this.birdCountAdvice] = retrievedAdvice[i];
                    if (this.birdCountAdvice < this.NUM_FIRST_DISPLAY) {
                        document.getElementById('birdsTitle').classList.remove('hiddenElem');
                        document.getElementById('birdsButton').classList.remove('hiddenElem');
                        document.getElementById('birdsAdviceID' + this.birdCountAdvice).classList.remove('hiddenElem');
                    }
                    this.birdCountAdvice++;
                }
                if (retrievedAdvice[i].Insects == "Y") {
                    this.ourInsectsAdvice[this.insectCountAdvice] = retrievedAdvice[i];
                    if (this.insectCountAdvice < this.NUM_FIRST_DISPLAY) {
                        document.getElementById('insectsTitle').classList.remove('hiddenElem');
                        document.getElementById('insectsButton').classList.remove('hiddenElem');
                        document.getElementById('insectsAdviceID' + this.insectCountAdvice).classList.remove('hiddenElem');
                    }
                    this.insectCountAdvice++;
                }
                if (retrievedAdvice[i].Amphibians == "Y") {
                    this.ourFrogsAdvice[this.frogCountAdvice] = retrievedAdvice[i];
                    if (this.frogCountAdvice < this.NUM_FIRST_DISPLAY) {
                        document.getElementById('frogTitle').classList.remove('hiddenElem');
                        document.getElementById('frogButton').classList.remove('hiddenElem');
                        document.getElementById('frogsAdviceID' + this.frogCountAdvice).classList.remove('hiddenElem');
                    }
                    this.frogCountAdvice++;
                }
            }
        }, err => {
            console.log(err);
        });
    }
    fetchInfo() {
        this.ourInfoService = this.infoService.getAnswerUpdateListener().subscribe((retrievedInfo) => {
            for (let j = 0; j < retrievedInfo.length; j++) {
                if (retrievedInfo[j].Special == "Y") {
                    //'specialAdvice' is a special case- there is only one piece of advice and it sits outside of the categories
                    this.ourSpecialAdvice[0] = retrievedInfo[j];
                    document.getElementById('specialAdvice').classList.remove('hiddenElem');
                }
                if (retrievedInfo[j].Hedgehogs == "Y") {
                    this.ourHedgehogInfo[this.hedgehogCountInfo] = retrievedInfo[j];
                    this.hedgehogCountInfo++;
                }
                if (retrievedInfo[j].Birds == "Y") {
                    this.ourBirdsInfo[this.birdCountInfo] = retrievedInfo[j];
                    this.birdCountInfo++;
                }
                if (retrievedInfo[j].Insects == "Y") {
                    this.ourInsectsInfo[this.insectCountInfo] = retrievedInfo[j];
                    this.insectCountInfo++;
                }
            }
        }, err => {
            console.log(err);
        });
    }
    seeMoreInsect() {
        for (let a = 0; a < this.insectCountAdvice; a++) {
            document.getElementById('insectsAdviceID' + a).classList.remove('hiddenElem');
        }
        for (let b = 0; b < this.insectCountInfo; b++) {
            document.getElementById('InsectInfoID' + b).classList.remove('hiddenElem');
        }
        document.getElementById('insectsButton').classList.add('hiddenElem');
        document.getElementById('insectsButtonLess').classList.remove('hiddenElem');
    }
    seeMoreHedgehog() {
        for (let c = 0; c < this.hedgehogCountAdvice; c++) {
            document.getElementById('hedgehogAdviceID' + c).classList.remove('hiddenElem');
        }
        for (let d = 0; d < this.hedgehogCountInfo; d++) {
            document.getElementById('HedgehogInfoID' + d).classList.remove('hiddenElem');
        }
        document.getElementById('hedgehogButton').classList.add('hiddenElem');
        document.getElementById('hedgehogButtonLess').classList.remove('hiddenElem');
    }
    seeMoreBird() {
        for (let e = 0; e < this.birdCountAdvice; e++) {
            document.getElementById('birdsAdviceID' + e).classList.remove('hiddenElem');
        }
        for (let d = 0; d < this.birdCountInfo; d++) {
            document.getElementById('BirdInfoID' + d).classList.remove('hiddenElem');
        }
        document.getElementById('birdsButton').classList.add('hiddenElem');
        document.getElementById('birdsButtonLess').classList.remove('hiddenElem');
    }
    seeMoreFrog() {
        for (let f = 0; f < this.frogCountAdvice; f++) {
            document.getElementById('frogsAdviceID' + f).classList.remove('hiddenElem');
        }
        document.getElementById('frogButton').classList.add('hiddenElem');
        document.getElementById('frogButtonLess').classList.remove('hiddenElem');
    }
    seeLessInsect() {
        //hide all except first piece of advice
        for (let g = this.NUM_FIRST_DISPLAY; g < this.insectCountAdvice; g++) {
            document.getElementById('insectsAdviceID' + g).classList.add('hiddenElem');
        }
        for (let h = 0; h < this.insectCountInfo; h++) {
            document.getElementById('InsectInfoID' + h).classList.add('hiddenElem');
        }
        document.getElementById('insectsButton').classList.remove('hiddenElem');
        document.getElementById('insectsButtonLess').classList.add('hiddenElem');
    }
    seeLessHedgehog() {
        for (let k = this.NUM_FIRST_DISPLAY; k < this.hedgehogCountAdvice; k++) {
            document.getElementById('hedgehogAdviceID' + k).classList.add('hiddenElem');
        }
        for (let l = 0; l < this.hedgehogCountInfo; l++) {
            document.getElementById('HedgehogInfoID' + l).classList.add('hiddenElem');
        }
        document.getElementById('hedgehogButton').classList.remove('hiddenElem');
        document.getElementById('hedgehogButtonLess').classList.add('hiddenElem');
    }
    seeLessBird() {
        for (let m = this.NUM_FIRST_DISPLAY; m < this.birdCountAdvice; m++) {
            document.getElementById('birdsAdviceID' + m).classList.add('hiddenElem');
        }
        for (let n = 0; n < this.birdCountInfo; n++) {
            document.getElementById('BirdInfoID' + n).classList.add('hiddenElem');
        }
        document.getElementById('birdsButton').classList.remove('hiddenElem');
        document.getElementById('birdsButtonLess').classList.add('hiddenElem');
    }
    seeLessFrog() {
        for (let o = this.NUM_FIRST_DISPLAY; o < this.frogCountAdvice; o++) {
            document.getElementById('frogsAdviceID' + o).classList.add('hiddenElem');
        }
        document.getElementById('frogButton').classList.remove('hiddenElem');
        document.getElementById('frogButtonLess').classList.add('hiddenElem');
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.ourPollinatorsService.unsubscribe();
        this.ourAdviceService.unsubscribe();
        this.ourInfoService.unsubscribe();
        // ******* We were experiencing a problem where, if you navigated away from the advice page and back and then
        //tried to get more advice it would crash the site. This is (presumably?) because there was still data being held by
        //the wildlife-advice-page components, so that when more data was added was inserted into the components the site crashed.
        //This is a very imperfect fix for this problem. '@HostListener('unloaded')' assures that whenever we exit the advice page,
        //ngOnDestroy() is called. 'window.location.reload();' then triggers the page (and therefore site) to reload. This prevents the crash. This is 
        //against the principle of a single page application, and so will be the first thing to fix if we have time!
        window.location.reload();
    }
    /* An array of saved advice is created and passed to all children. When 'save this advice' is clicked in an advice box, it adds a data entry to this
    array. When a user submits their email, this array is wrapped up with the email and location (retrieved from CompleteAnswerSet) and added to the database as geojson.
    Therefore, it may be useful to generate longitude/latitude in locationInfo.*/
    addAdvice(advice) {
        this.savedAdvice.push(advice);
    }
    removeAdvice(advice) {
        this.savedAdvice.forEach((value, index) => {
            if (value.Header == advice) {
                this.savedAdvice.splice(index, 1);
            }
        });
    }
};
__decorate([
    HostListener('unloaded')
], WildlifeLayoutComponent.prototype, "ngOnDestroy", null);
WildlifeLayoutComponent = __decorate([
    Component({
        selector: 'app-wildlife-layout',
        templateUrl: './wildlife-layout.component.html',
        styleUrls: ['./wildlife-layout.component.scss']
    })
], WildlifeLayoutComponent);
export { WildlifeLayoutComponent };
//# sourceMappingURL=wildlife-layout.component.js.map