import { Injectable } from '@angular/core';
import { WildlifeAnswerSet } from './wildlife-answers.model';
import { Observable, Subject } from 'rxjs';

// This syntax is a shortcut equivalent of adding postsService to the 'providers' 
// section of app.module.ts
@Injectable({providedIn: 'root'})
export class WildlifeAnswers{

    private ourAnswers: WildlifeAnswerSet[] = [];
    private updatedAnswers = new Subject<WildlifeAnswerSet[]>();

    // getAnswer(){
    //     // This syntax allows us to remove the elements from posts and add them 
    //     // to a new array- we are not sending the array itself
    //     // We need the concept of 'observables' in conjunction with this, because
    //     // when create the copy of the array, we would naturally copy the 'original' array-
    //     // i.e the one that is empty
    //     return [...this.ourAnswers];
    // }

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