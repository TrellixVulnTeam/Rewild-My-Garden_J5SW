import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
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
            let ourPersonalisationQuery : String = this.getPersonalisationString(retrievedAnswers);
            //Then use that data to filter API data for display
            this.adviceSub = this.httpClient.get<AdviceGeneric[]>(
                    "https://rewildmygarden-api.azurewebsites.net/api/adviceData?SizeQueryType=" 
                    + ourGardenSize + "&Size=Y" + ourPersonalisationQuery).subscribe(
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

    private getPersonalisationString(retrievedAnswers: CompleteAnswerSet) : String{
        //If we do notadd to the string, api.js effectively finds by " : "- which captures everything, meaning no
        //filter is applied
        let ourString: String = "";
        if(retrievedAnswers.childFriendly == "true"){
            ourString = ourString + "&ChildFriendlyQuery=ChildFriendly&ChildFriendlyResponse=Y"
        }
        else
        if(retrievedAnswers.cheap == "true"){
            ourString = ourString + "&CheapQuery=Cheap&CheapResponse=Y"
        }
        if(retrievedAnswers.easy == "true"){
            ourString = ourString + "&EasyQuery=Easy&EasyResponse=Y"
        }
        if(retrievedAnswers.renting == "true"){
            ourString = ourString + "&RentingQuery=Renting&RentingResponse=Y"
        }
        if(retrievedAnswers.pavedGardens == "true"){
            ourString = ourString + "&PavedGardensQuery=PavedGardens&PavedGardensResponse=Y"
        }
        return ourString;
    }

    getAnswerUpdateListener(): Observable<any>{
        return this.updatedAdvice.asObservable();
    }

    //This is called whenever this component is about to be removed from the DOM
    @HostListener('unloaded')
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.answersSub.unsubscribe();
        this.adviceSub.unsubscribe();
    }
}