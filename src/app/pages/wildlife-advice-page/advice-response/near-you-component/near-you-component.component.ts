import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { CompleteAnswerSet } from '../../models/all-answers.model';
import { AdviceSave } from '../../models/save-advice.model';
import { UserDataSave } from '../../models/save-user-data.model';
import { AdviceService } from '../../services/advice-boxes.service';
import { AllAnswers } from '../../services/all-answers.service';
import { ProximityEnvironment } from './proximity-env';

@Component({
  selector: 'app-near-you-component',
  templateUrl: './near-you-component.component.html',
  styleUrls: ['./near-you-component.component.scss']
})
export class NearYouComponentComponent implements OnInit {

  //Subscriptions to wildlife answers data
  private userSub: Subscription = new Subscription();
  private ourAnswersService: Subscription = new Subscription();

  //Input from wildlife layout
  // @Input() latitude: Number = 0;
  // @Input() longitude: Number = 0;
  private latitude: Number = 0;
  private longitude: Number = 0;

  private adviceOne: AdviceSave = { Header: "", Pathname: "", Name: "", Username: "", Copyright: "", Link: ""};
  private adviceTwo: AdviceSave = { Header: "", Pathname: "", Name: "", Username: "", Copyright: "", Link: ""};
  private adviceThree: AdviceSave = { Header: "", Pathname: "", Name: "", Username: "", Copyright: "", Link: ""};
  public displayArray: AdviceSave[] = [this.adviceOne, this.adviceTwo, this.adviceThree];

  private closeData: UserDataSave[] = [];
  private usefulProximityData: UserDataSave[] = [];
  private inspoProximityData: UserDataSave[] = [];

  constructor(private httpClient: HttpClient, public allAnswersService: AllAnswers) { 
    this.ourAnswersService = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: CompleteAnswerSet) => {
      this.latitude = retrievedAnswers.latitude;
      this.longitude = retrievedAnswers.longitude;

      this.setUserDataInspo(ProximityEnvironment.INSPIRATION_PROXIMITY);
      // this.setUserDataClose(ProximityEnvironment.CLOSEST);
    });
  }

  private setUserDataInspo(proximity: Number) {
    this.userSub = this.httpClient.get<UserDataSave[]>("http://localhost:3000/api/userData?Distance=" + proximity + "&Longitude=" + this.longitude + "&Latitude=" + this.latitude).subscribe(
      response => {
        var inspoArray : AdviceSave[] = [];
        let count = 0;
        for(let i=0; i<response.length; i++){
          let ourUserData : UserDataSave = response[i];
          for(let j=0; j<ourUserData.properties.savedAdvice.length; j++){
            inspoArray[count] = { 
              Header: ourUserData.properties.savedAdvice[j].Header,
              Pathname: ourUserData.properties.savedAdvice[j].Pathname,
              Name: ourUserData.properties.savedAdvice[j].Name,
              Username: ourUserData.properties.savedAdvice[j].Username,
              Copyright: ourUserData.properties.savedAdvice[j].Copyright,
              Link: ourUserData.properties.savedAdvice[j].Link,
            }
            count++;
          }
        }
        //If noone is detected in our largest radius we won't find anybody- so display default box
        if(inspoArray.length == 0){
          document.getElementById('NooneNear')!.classList.remove('hiddenElem');
        } 
        //otherwise there are other users to be inspired by- display data
        else{
          //we don't want more than three examples- limited by inspoArray.length or 3, whichever comes first
          for(let m = 0; (m < inspoArray.length && m < 3); m++){
            this.displayArray[m] = inspoArray[m];
            document.getElementById('Inspiration')!.classList.remove('hiddenElem');
            document.getElementById('SingleAdvice' + m)!.classList.remove('hiddenElem');
          }
        }
    });
  }

  private setUserUserfulClose(proximity: Number) {
    this.userSub = this.httpClient.get<UserDataSave[]>("http://localhost:3000/api/userData?Distance=" + proximity + "&Longitude=" + this.longitude + "&Latitude=" + this.latitude).subscribe(
      response => {
        var closeArray : AdviceSave[] = [];
        let count = 0;
        for(let i=0; i<response.length; i++){
          let ourUserData : UserDataSave = response[i];
          for(let j=0; j<ourUserData.properties.savedAdvice.length; j++){
            closeArray[count] = { 
              Header: ourUserData.properties.savedAdvice[j].Header,
              Pathname: ourUserData.properties.savedAdvice[j].Pathname,
              Name: ourUserData.properties.savedAdvice[j].Name,
              Username: ourUserData.properties.savedAdvice[j].Username,
              Copyright: ourUserData.properties.savedAdvice[j].Copyright,
              Link: ourUserData.properties.savedAdvice[j].Link,
            }
            count++;
          }
        }
        if(closeArray.length != 0){
          for(let n = 0; n < closeArray.length; n++){
            if((closeArray[n].Header == "Put in a Small Water Feature") || (closeArray[n].Header == "Create a Container Water Feature") || (closeArray[n].Header == "Put in a Pond"))
            document.getElementById('PondDistance')!.classList.remove('hiddenElem');
          }
        }
    });
  }

  private setUserDataClose(proximity: Number) {
    this.userSub = this.httpClient.get<UserDataSave[]>("http://localhost:3000/api/userData?Distance=" + proximity + "&Longitude=" + this.longitude + "&Latitude=" + this.latitude).subscribe(
      response => {
        var closeArray : AdviceSave[] = [];
        let count = 0;
        for(let i=0; i<response.length; i++){
          let ourUserData : UserDataSave = response[i];
          for(let j=0; j<ourUserData.properties.savedAdvice.length; j++){
            closeArray[count] = { 
              Header: ourUserData.properties.savedAdvice[j].Header,
              Pathname: ourUserData.properties.savedAdvice[j].Pathname,
              Name: ourUserData.properties.savedAdvice[j].Name,
              Username: ourUserData.properties.savedAdvice[j].Username,
              Copyright: ourUserData.properties.savedAdvice[j].Copyright,
              Link: ourUserData.properties.savedAdvice[j].Link,
            }
            count++;
          }
        }
        if(closeArray.length != 0){
          for(let n = 0; n < closeArray.length; n++){
            if(closeArray[n].Header == "Create a Hedgehog Hole Highway")
            document.getElementById('HedgehogDistance')!.classList.remove('hiddenElem');
          }
        }
    });
  }

  ngOnInit(): void {
  }

  //This is called whenever this component is about to be removed from the DOM
  ngOnDestroy() {
    //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
    this.userSub.unsubscribe();
    this.ourAnswersService.unsubscribe();
  }   
}

