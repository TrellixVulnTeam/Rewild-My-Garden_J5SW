import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { BasicLocationData } from '../models/location-data.model';

//***** the service stucture we're using isn't entirely logical- it's not logical for instance that find-postcode
//***** check all subscriptions are unsubscribed from!
//calls the OS api and this calls the hardiness API- if there's time, it may be worth refactoring into a more
//considered model. For now, we're just going with an approach that works.
//For instance, some of our components could probably call an api themselves rather than being passed it through a service file

@Injectable({providedIn: 'root'})
export class LocationAnswers{

    private updatedLocation = new Subject<BasicLocationData>();
    private answersSub: Subscription = new Subscription();
    constructor(private httpClient: HttpClient){}

    getAnswerUpdateListener(): Observable<any>{
        return this.updatedLocation.asObservable();
    }

    addAnswerSet(xAnswer: Number, yAnswer: Number){
        //This fetches the hardiness data from our api
        this.answersSub = this.httpClient.get<BasicLocationData[]>("http://localhost:3000/api/minTempData?x=" + xAnswer + "&y=" + yAnswer).subscribe(
            response => {
                console.log("location answer service response : " + response[0].hardiness);
                //this service just fetches our hardiness
                const ourLocation: BasicLocationData = {x: xAnswer, y: yAnswer, hardiness: response[0].hardiness};
                console.log("location answer service : " + ourLocation);
                console.log("location answer service : " + ourLocation.hardiness);
                this.updatedLocation.next(ourLocation);            
            }
        );
    }

    //This is called whenever this component is about to be removed from the DOM
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSub.unsubscribe();
    }
}