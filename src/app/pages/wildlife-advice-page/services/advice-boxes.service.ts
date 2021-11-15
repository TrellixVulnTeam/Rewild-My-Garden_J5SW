import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { AdviceGeneric } from '../models/advice.model';
import { WildlifeAnswerSet } from '../models/multichoice-answers.model';
import { WildlifeAnswers } from './multichoice-answers.service';

@Injectable({providedIn: 'root'})
export class AdviceService{

    private updatedAdvice = new Subject<AdviceGeneric[]>();
    //Subscriptions to wildlife answers data
    private answersSub: Subscription = new Subscription();
    public ourAnswer: WildlifeAnswerSet = {soil: "", ph: "", shade: "", gardenSize: ""};

    constructor(private httpClient: HttpClient, public wildlifeAnswersService: WildlifeAnswers){
        //here we are subscribing to the listener
        this.answersSub = this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: WildlifeAnswerSet) => {
            // this.ourAnswer = retrievedAnswers.pop()!;
            //Then use that data to filter API data for display
            this.httpClient.get<AdviceGeneric[]>("http://localhost:3000/api/adviceData").subscribe(
                response => {
                this.updatedAdvice.next(response);
            });
        });
    }

    getAnswerUpdateListener(): Observable<any>{
        return this.updatedAdvice.asObservable();
    }

    //This is called whenever this component is about to be removed from the DOM
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSub.unsubscribe();
    }
}