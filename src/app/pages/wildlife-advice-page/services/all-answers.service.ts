import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { CompleteAnswerSet } from '../models/all-answers.model';
import { BasicLocationData } from '../models/location-data.model';
import { WildlifeAnswerSet } from '../models/multichoice-answers.model';
import { LocationAnswers } from './location-answer.service';
import { WildlifeAnswers } from './multichoice-answers.service';

@Injectable({providedIn: 'root'})
export class AllAnswers{

    private updatedAnswers = new Subject<CompleteAnswerSet>();
    private answersSubMulti: Subscription = new Subscription();
    private answersSubLocs: Subscription = new Subscription();

    constructor(public wildlifeAnswersService: WildlifeAnswers, public locationAnswersService: LocationAnswers){
        //here we subscribe to the multichoice answers and then the location and turn them into one subscription object
        this.answersSubMulti = this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: WildlifeAnswerSet) => {
            this.answersSubLocs = this.locationAnswersService.getAnswerUpdateListener().subscribe((retrievedLocation: BasicLocationData) => {
                const allAnswers: CompleteAnswerSet = {
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
            },
            err => {
              console.log(err);
            });
        },
        err => {
          console.log(err);
        });
    }

    getAnswerUpdateListener(): Observable<any>{
        return this.updatedAnswers.asObservable();
    }

    //This is called whenever this component is about to be removed from the DOM
    @HostListener('unloaded')
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSubMulti.unsubscribe();
        this.answersSubLocs.unsubscribe();
    }
}