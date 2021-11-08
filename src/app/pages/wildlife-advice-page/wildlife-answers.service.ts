import { Injectable } from '@angular/core';
import { WildlifeAnswerSet } from './wildlife-answers.model';
import { Observable, Subject } from 'rxjs';

// This syntax is a shortcut equivalent of adding postsService to the 'providers' 
// section of app.module.ts
@Injectable({providedIn: 'root'})
export class WildlifeAnswers{

    private ourAnswers: WildlifeAnswerSet[] = [];
    private updatedAnswers = new Subject<WildlifeAnswerSet[]>();

    getAnswerUpdateListener(): Observable<any>{
        return this.updatedAnswers.asObservable();
    }

    addAnswerSet(soilAnswer: String, phAnswer: String, shadeAnswer: String){
        const ourAnswer: WildlifeAnswerSet = {soil: soilAnswer, ph: phAnswer, shade: shadeAnswer};
        this.ourAnswers.push(ourAnswer);
        //This is the equivalent of .emit- it sets a copy of the posts after they have been updated
        //The three methods that can be called on our observable are .next(), .error() and .complete()
        this.updatedAnswers.next([...this.ourAnswers]);
    }
}