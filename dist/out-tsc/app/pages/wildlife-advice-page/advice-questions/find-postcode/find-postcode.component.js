import { __awaiter, __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { osApiEnvironment } from './os-api-env';
let FindPostcodeComponent = class FindPostcodeComponent {
    constructor(locationAnswersService) {
        this.locationAnswersService = locationAnswersService;
        this.nextQuestion = new EventEmitter();
        this.postcodeFormControl = new FormControl('', [Validators.required]);
    }
    ngOnInit() {
    }
    saveForm() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.postcodeFormControl.value == "") {
                //If response is empty, create 'postcode required' err
                document.getElementById('errMessageForm').innerHTML = "Postcode required.";
                return;
            }
            //search the ordnance survey databas to find information about the opstcode submitted
            //limiting the response to 1 so we only get exact results
            axios.get('https://api.os.uk/search/names/v1/find?maxresults=1&query=' + this.postcodeFormControl.value + '&key=' + osApiEnvironment.OS_API_KEY)
                .then((response) => {
                //******* THIS ONLY WORKS WITH NO SPACE IN POSTCODE
                if (response.data.results[0].GAZETTEER_ENTRY.ID.toUpperCase() === this.postcodeFormControl.value.toUpperCase()) {
                    document.getElementById('errMessageForm').innerHTML = "";
                    //A response is composed of the results from multiple tick boxes!
                    this.locationAnswersService.addAnswerSet(response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_X, response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_Y);
                    //Notify that we are ready to see the next question
                    this.nextQuestion.emit();
                }
                else {
                    //If is in a valid postcode format but the address cannot be found, throw unfound postcode err
                    document.getElementById('errMessageForm').innerHTML = "Cannot find your postcode.";
                }
            })
                //********** Try using error codes to finesse this response
                .catch(error => {
                //If the API throws an err because entry is not a valid postcode format, throw invalid postcode err
                document.getElementById('errMessageForm').innerHTML = "Invalid postcode.";
            });
        });
    }
};
__decorate([
    Output()
], FindPostcodeComponent.prototype, "nextQuestion", void 0);
FindPostcodeComponent = __decorate([
    Component({
        selector: 'app-find-postcode',
        templateUrl: './find-postcode.component.html',
        styleUrls: ['./find-postcode.component.scss']
    })
], FindPostcodeComponent);
export { FindPostcodeComponent };
//# sourceMappingURL=find-postcode.component.js.map