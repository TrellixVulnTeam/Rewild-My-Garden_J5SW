import { __decorate } from "tslib";
import { HostListener, Injectable } from '@angular/core';
import axios from 'axios';
import { Subject, Subscription } from 'rxjs';
//***** the service stucture we're using isn't entirely logical- it's not logical for instance that find-postcode
//calls the OS api and this calls the hardiness API- if there's time, it may be worth refactoring into a more
//considered model. For now, we're just going with an approach that works.
//For instance, some of our components could probably call an api themselves rather than being passed it through a service file
let LocationAnswers = class LocationAnswers {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.updatedLocation = new Subject();
        this.answersSub = new Subscription();
    }
    ;
    getAnswerUpdateListener() {
        return this.updatedLocation.asObservable();
    }
    addAnswerSet(xAnswer, yAnswer) {
        //This fetches the hardiness data from our api
        this.answersSub = this.httpClient.get("http://localhost:3000/api/minTempData?x=" + xAnswer + "&y=" + yAnswer).subscribe(response => {
            //THINK ABOUT THE ERROR CONDITION FOR THIS ************
            //convert BNG to longtiude/latitude
            axios.get('https://api.getthedata.com/bng2latlong/' + xAnswer + '/' + yAnswer)
                .then((longLatresponse) => {
                const longitude = longLatresponse.data.longitude;
                const latitude = longLatresponse.data.latitude;
                //this service just fetches our hardiness
                const ourLocation = { x: xAnswer, y: yAnswer, longitude: longitude, latitude: latitude, hardiness: response[0].hardiness };
                this.updatedLocation.next(ourLocation);
            }, err => {
                console.log(err);
            });
        }, err => {
            console.log(err);
        });
    }
    //This is called whenever this component is about to be removed from the DOM
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSub.unsubscribe();
    }
};
__decorate([
    HostListener('unloaded')
], LocationAnswers.prototype, "ngOnDestroy", null);
LocationAnswers = __decorate([
    Injectable({ providedIn: 'root' })
], LocationAnswers);
export { LocationAnswers };
//# sourceMappingURL=location-answer.service.js.map