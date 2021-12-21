import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { CompleteAnswerSet } from '../models/all-answers.model';
import { InfoGeneric } from '../models/info.model';
import { AllAnswers } from './all-answers.service';

@Injectable({providedIn: 'root'})
export class InfoService{

    private updatedInfo = new Subject<InfoGeneric[]>();
    //Subscriptions to wildlife answers data
    private answersSub: Subscription = new Subscription();
    private infoSub: Subscription = new Subscription();

    constructor(private httpClient: HttpClient, public allAnswersService: AllAnswers){
        //here we are subscribing to the listener
        this.answersSub = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: CompleteAnswerSet) => {
            const ourGardenSize = retrievedAnswers.gardenSize;
            //Then use that data to filter API data for display
            this.infoSub = this.httpClient.get<InfoGeneric[]>("https://rewildmygarden-api.azurewebsites.net/api/infoData?SizeQueryType=" + ourGardenSize + "&Size=Y").subscribe(
                response => {
                this.updatedInfo.next(response);
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
        return this.updatedInfo.asObservable();
    }

    //This is called whenever this component is about to be removed from the DOM
    @HostListener('unloaded')
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSub.unsubscribe();
        this.infoSub.unsubscribe();
    }
}