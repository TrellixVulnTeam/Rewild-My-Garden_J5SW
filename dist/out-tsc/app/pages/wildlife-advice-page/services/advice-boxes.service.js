import { __decorate } from "tslib";
import { HostListener, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
let AdviceService = class AdviceService {
    constructor(httpClient, allAnswersService) {
        this.httpClient = httpClient;
        this.allAnswersService = allAnswersService;
        this.updatedAdvice = new Subject();
        //Subscriptions to wildlife answers data
        this.answersSub = new Subscription();
        this.adviceSub = new Subscription();
        //here we are subscribing to the listener
        this.answersSub = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers) => {
            const ourGardenSize = retrievedAnswers.gardenSize;
            let ourPersonalisationQuery = this.getPersonalisationString(retrievedAnswers);
            //Then use that data to filter API data for display
            this.adviceSub = this.httpClient.get("http://localhost:3000/api/adviceData?SizeQueryType="
                + ourGardenSize + "&Size=Y" + ourPersonalisationQuery).subscribe(response => {
                this.updatedAdvice.next(response);
            }, err => {
                console.log(err);
            });
        }, err => {
            console.log(err);
        });
    }
    getPersonalisationString(retrievedAnswers) {
        //If we do notadd to the string, api.js effectively finds by " : "- which captures everything, meaning no
        //filter is applied
        let ourString = "";
        if (retrievedAnswers.childFriendly == "true") {
            ourString = ourString + "&ChildFriendlyQuery=ChildFriendly&ChildFriendlyResponse=Y";
        }
        else if (retrievedAnswers.cheap == "true") {
            ourString = ourString + "&CheapQuery=Cheap&CheapResponse=Y";
        }
        if (retrievedAnswers.easy == "true") {
            ourString = ourString + "&EasyQuery=Easy&EasyResponse=Y";
        }
        if (retrievedAnswers.renting == "true") {
            ourString = ourString + "&RentingQuery=Renting&RentingResponse=Y";
        }
        if (retrievedAnswers.pavedGardens == "true") {
            ourString = ourString + "&PavedGardensQuery=PavedGardens&PavedGardensResponse=Y";
        }
        return ourString;
    }
    getAnswerUpdateListener() {
        return this.updatedAdvice.asObservable();
    }
    //This is called whenever this component is about to be removed from the DOM
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSub.unsubscribe();
        this.adviceSub.unsubscribe();
    }
};
__decorate([
    HostListener('unloaded')
], AdviceService.prototype, "ngOnDestroy", null);
AdviceService = __decorate([
    Injectable({ providedIn: 'root' })
], AdviceService);
export { AdviceService };
//# sourceMappingURL=advice-boxes.service.js.map