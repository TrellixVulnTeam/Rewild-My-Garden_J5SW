import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, Subject, Subscription } from 'rxjs';
import { BasicLocationData } from '../models/location-data.model';

//***** the service stucture we're using isn't entirely logical- it's not logical for instance that find-postcode
//calls the OS api and this calls the hardiness API- if there's time, it may be worth refactoring into a more
//considered model. For now, we're just going with an approach that works.
//For instance, some of our components could probably call an api themselves rather than being passed it through a service file

@Injectable({providedIn: 'root'})
export class LocationAnswers{

    private updatedLocation = new Subject<BasicLocationData>();
    private answersSub: Subscription = new Subscription();
    constructor(private httpClient: HttpClient){};

    getAnswerUpdateListener(): Observable<any>{
        return this.updatedLocation.asObservable();
    }

    addAnswerSet(xAnswer: Number, yAnswer: Number){
        //This fetches the hardiness data from our api
        this.answersSub = this.httpClient.get<BasicLocationData[]>("https://rewildmygarden-api.azurewebsites.net/api/minTempData?x=" + xAnswer + "&y=" + yAnswer).subscribe(
            response => {
                //THINK ABOUT THE ERROR CONDITION FOR THIS ************
                //convert BNG to longtiude/latitude
                axios.get('https://api.getthedata.com/bng2latlong/' + xAnswer + '/' + yAnswer)
                .then((longLatresponse) => {
                    const longitude: Number = longLatresponse.data.longitude;
                    const latitude: Number = longLatresponse.data.latitude;
                    //This is a BIG plaster to protect us from someone from somewhere unusual doing the questionnaire and getting a result from Ordnance Survey map which
                    //has no equivalent in our Hardiness data. This needs a proper fix but will be fine for now. ************
                    //8 has been chosen because it's pretty common for the UK
                    if((response.length == 0) || (response[0].hardiness == "NaN")){
                        const ourLocation: BasicLocationData = {x: xAnswer, y: yAnswer, longitude: longitude, latitude: latitude, hardiness: "8"};
                        this.updatedLocation.next(ourLocation);      
                    }
                    else{
                        const ourLocation: BasicLocationData = {x: xAnswer, y: yAnswer, longitude: longitude, latitude: latitude, hardiness: response[0].hardiness};
                        this.updatedLocation.next(ourLocation);      
                    }
                },
                err => {
                  console.log(err);
                });      
            },
            err => {
              console.log(err);
            }
        );
    }

    //This is called whenever this component is about to be removed from the DOM
    @HostListener('unloaded')
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSub.unsubscribe();
    }
}