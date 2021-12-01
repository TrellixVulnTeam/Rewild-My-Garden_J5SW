import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { AdviceGeneric } from '../models/advice.model';
import { CompleteAnswerSet } from '../models/all-answers.model';
import { AllAnswers } from './all-answers.service';

@Injectable({providedIn: 'root'})
export class AdviceService{

    private updatedAdvice = new Subject<AdviceGeneric[]>();
    //Subscriptions to wildlife answers data
    private answersSub: Subscription = new Subscription();
    private adviceSub: Subscription = new Subscription();

    constructor(private httpClient: HttpClient, public allAnswersService: AllAnswers){
        //here we are subscribing to the listener
        this.answersSub = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: CompleteAnswerSet) => {
            const ourGardenSize = retrievedAnswers.gardenSize;
            //Then use that data to filter API data for display
            this.adviceSub = this.httpClient.get<AdviceGeneric[]>("http://localhost:3000/api/adviceData?SizeQueryType=" + ourGardenSize + "&Size=Y").subscribe(
                response => {
                this.updatedAdvice.next(response);
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
        return this.updatedAdvice.asObservable();
    }

    //This is called whenever this component is about to be removed from the DOM
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSub.unsubscribe();
        this.adviceSub.unsubscribe();
    }
}