import { __decorate } from "tslib";
import { HostListener, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
let InfoService = class InfoService {
    constructor(httpClient, allAnswersService) {
        this.httpClient = httpClient;
        this.allAnswersService = allAnswersService;
        this.updatedInfo = new Subject();
        //Subscriptions to wildlife answers data
        this.answersSub = new Subscription();
        this.infoSub = new Subscription();
        //here we are subscribing to the listener
        this.answersSub = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers) => {
            const ourGardenSize = retrievedAnswers.gardenSize;
            //Then use that data to filter API data for display
            this.infoSub = this.httpClient.get("https://rewildmygarden-api.azurewebsites.net/api/infoData?SizeQueryType=" + ourGardenSize + "&Size=Y").subscribe(response => {
                this.updatedInfo.next(response);
            }, err => {
                console.log(err);
            });
        }, err => {
            console.log(err);
        });
    }
    getAnswerUpdateListener() {
        return this.updatedInfo.asObservable();
    }
    //This is called whenever this component is about to be removed from the DOM
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSub.unsubscribe();
        this.infoSub.unsubscribe();
    }
};
__decorate([
    HostListener('unloaded')
], InfoService.prototype, "ngOnDestroy", null);
InfoService = __decorate([
    Injectable({ providedIn: 'root' })
], InfoService);
export { InfoService };
//# sourceMappingURL=info-boxes.service.js.map