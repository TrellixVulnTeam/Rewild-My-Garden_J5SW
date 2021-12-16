import { __decorate } from "tslib";
import { HostListener, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
let AllAnswers = class AllAnswers {
    constructor(wildlifeAnswersService, locationAnswersService) {
        this.wildlifeAnswersService = wildlifeAnswersService;
        this.locationAnswersService = locationAnswersService;
        this.updatedAnswers = new Subject();
        this.answersSubMulti = new Subscription();
        this.answersSubLocs = new Subscription();
        //here we subscribe to the multichoice answers and then the location and turn them into one subscription object
        this.answersSubLocs = this.locationAnswersService.getAnswerUpdateListener().subscribe((retrievedLocation) => {
            this.answersSubMulti = this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers) => {
                const allAnswers = {
                    soil: retrievedAnswers.soil,
                    ph: retrievedAnswers.ph,
                    shade: retrievedAnswers.shade,
                    gardenSize: retrievedAnswers.gardenSize,
                    childFriendly: retrievedAnswers.childFriendly,
                    cheap: retrievedAnswers.cheap,
                    easy: retrievedAnswers.easy,
                    renting: retrievedAnswers.renting,
                    pavedGardens: retrievedAnswers.pavedGardens,
                    x: retrievedLocation.x,
                    y: retrievedLocation.y,
                    longitude: retrievedLocation.longitude,
                    latitude: retrievedLocation.latitude,
                    hardiness: retrievedLocation.hardiness,
                };
                this.updatedAnswers.next(allAnswers);
            }, err => {
                console.log(err);
            });
        }, err => {
            console.log(err);
        });
    }
    getAnswerUpdateListener() {
        return this.updatedAnswers.asObservable();
    }
    //This is called whenever this component is about to be removed from the DOM
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSubMulti.unsubscribe();
        this.answersSubLocs.unsubscribe();
    }
};
__decorate([
    HostListener('unloaded')
], AllAnswers.prototype, "ngOnDestroy", null);
AllAnswers = __decorate([
    Injectable({ providedIn: 'root' })
], AllAnswers);
export { AllAnswers };
//# sourceMappingURL=all-answers.service.js.map