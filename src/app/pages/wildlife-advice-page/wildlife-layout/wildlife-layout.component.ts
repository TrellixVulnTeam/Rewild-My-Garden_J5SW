import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { AdviceGeneric } from '../models/advice.model';
import { CompleteAnswerSet } from '../models/all-answers.model';
import { InfoGeneric } from '../models/info.model';
import { AdviceSave } from '../models/save-advice.model';
import { UserDataSave } from '../models/save-user-data.model';
import { AdviceService } from '../services/advice-boxes.service';
import { AllAnswers } from '../services/all-answers.service';
import { InfoService } from '../services/info-boxes.service';

@Component({
  selector: 'app-wildlife-layout',
  templateUrl: './wildlife-layout.component.html',
  styleUrls: ['./wildlife-layout.component.scss']
})
export class WildlifeLayoutComponent implements OnInit {

  //********************* There is currently a bug which kills the page if you ask 
  //for two sets of advice !!

  /**********************************************************************
   **********************************************************************
   *** LOGIC TO HIDE/UNHIDE PAGE ELEMENTS AND CHOOSE ADVICE/INFO BOXES **
   **********************************************************************
   ***********************************************************************/

  public multichoiceShow: boolean = true;
  public responseShow: boolean = false;

  private ourPollinatorsService: Subscription = new Subscription();
  private ourAdviceService: Subscription = new Subscription();
  private ourInfoService: Subscription = new Subscription();
  private extraSub: Subscription = new Subscription();

  public hedgehogAdviceOne: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public hedgehogAdviceTwo: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public hedgehogAdviceThree: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public ourHedgehogAdvice: AdviceGeneric[] = [this.hedgehogAdviceOne, this.hedgehogAdviceTwo, this.hedgehogAdviceThree];
  
  public hedgehogInfoOne: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public ourHedgehogInfo: InfoGeneric[] = [this.hedgehogInfoOne];

  public birdAdviceOne: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public birdAdviceTwo: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public birdAdviceThree: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public birdAdviceFour: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public ourBirdsAdvice: AdviceGeneric[] = [this.birdAdviceOne, this.birdAdviceTwo, this.birdAdviceThree, this.birdAdviceFour];

  public birdInfoOne: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public birdInfoTwo: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public ourBirdsInfo: InfoGeneric[] = [this.birdInfoOne, this.birdInfoTwo];

  public insectAdviceOne: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceTwo: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceThree: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceFour: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceFive: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public insectAdviceSix: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public ourInsectsAdvice: AdviceGeneric[] = [this.insectAdviceOne, this.insectAdviceTwo, this.insectAdviceThree, this.insectAdviceFour, this.insectAdviceFive, this.insectAdviceSix];

  public insectInfoOne: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public insectInfoTwo: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public insectInfoThree: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  public ourInsectsInfo: InfoGeneric[] = [this.insectInfoOne, this.insectInfoTwo, this.insectInfoThree];

  public frogAdviceOne: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public frogAdviceTwo: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public frogAdviceThree: AdviceGeneric = {"Header": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public ourFrogsAdvice: AdviceGeneric[] = [this.frogAdviceOne, this.frogAdviceTwo, this.frogAdviceThree];


  // public infoOne: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  // public infoTwo: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  // public infoThree: InfoGeneric = {"Title": "", "Special": "", "Hedgehogs": "",	"Birds": "", "Insects": "",	"Amphibians": "", "BodyText": ""};
  // public ourInfo: InfoGeneric[] = [this.infoOne, this.infoTwo, this.infoThree];

  // <app-wildlife-advice-generic id="hedgehogAdviceID0" class="hiddenElem" [adviceGenericObject]="ourHedgehogAdvice[0]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  // <app-wildlife-advice-generic id="hedgehogAdviceID1" class="hiddenElem" [adviceGenericObject]="ourHedgehogAdvice[1]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  //     <app-wildlife-info-generic id="HedgehogInfoID0" class="hiddenElem" [infoGenericObject]="ourHedgehogInfo[0]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-info-generic>
  // <app-wildlife-advice-generic id="hedgehogAdviceID2" class="hiddenElem" [adviceGenericObject]="ourHedgehogAdvice[2]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  //     <p class="Subheader">Advice to Help Birds</p>
  // <app-wildlife-advice-generic id="birdsAdviceID0" class="hiddenElem" [adviceGenericObject]="ourBirdsAdvice[0]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  // <app-wildlife-advice-generic id="birdsAdviceID1" class="hiddenElem" [adviceGenericObject]="ourBirdsAdvice[1]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  //     <app-wildlife-info-generic id="BirdInfoID0" class="hiddenElem" [infoGenericObject]="ourBirdInfo[0]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-info-generic>
  // <app-wildlife-advice-generic id="birdsAdviceID2" class="hiddenElem" [adviceGenericObject]="ourBirdsAdvice[2]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  //     <app-wildlife-info-generic id="BirdInfoID01" class="hiddenElem" [infoGenericObject]="ourBirdInfo[1]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-info-generic>
  // <app-wildlife-advice-generic id="birdsAdviceID3" class="hiddenElem" [adviceGenericObject]="ourBirdsAdvice[3]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  //     <p class="Subheader">Advice to Help Pollinators and Other Insects</p>
  // <app-wildlife-advice-generic id="insectsAdviceID0" class="hiddenElem" [adviceGenericObject]="ourInsectsAdvice[0]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  // <app-wildlife-advice-generic id="insectsAdviceID1" class="hiddenElem" [adviceGenericObject]="ourInsectsAdvice[1]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  //   <app-wildlife-info-generic id="InsectInfoID0" class="hiddenElem" [infoGenericObject]="ourInsectInfo[0]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-info-generic>
  // <app-wildlife-advice-generic id="insectsAdviceID2" class="hiddenElem" [adviceGenericObject]="ourInsectsAdvice[2]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  // <app-wildlife-advice-generic id="insectsAdviceID3" class="hiddenElem" [adviceGenericObject]="ourInsectsAdvice[3]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  //   <app-wildlife-info-generic id="InsectInfoID1" class="hiddenElem" [infoGenericObject]="ourInsectInfo[1]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-info-generic>
  // <app-wildlife-advice-generic id="insectsAdviceID4" class="hiddenElem" [adviceGenericObject]="ourInsectsAdvice[4]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  //   <app-wildlife-info-generic id="InsectInfoID2" class="hiddenElem" [infoGenericObject]="ourInsectInfo[2]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-info-generic>
  // <app-wildlife-advice-generic id="insectsAdviceID5" class="hiddenElem" [adviceGenericObject]="ourInsectsAdvice[5]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  //         <p class="Subheader">Advice to Help Frogs and Other Amphibians</p>
  // <app-wildlife-advice-generic id="frogsAdviceID0" class="hiddenElem" [adviceGenericObject]="ourFrogsAdvice[0]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  // <app-wildlife-advice-generic id="frogsAdviceID1" class="hiddenElem" [adviceGenericObject]="ourFrogsAdvice[1]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>
  // <app-wildlife-advice-generic id="frogsAdviceID2" class="hiddenElem" [adviceGenericObject]="ourFrogsAdvice[2]" (newSaveEvent)="addAdvice($event)" (newRemoveEvent)="removeAdvice($event)"></app-wildlife-advice-generic>

  private randRecordAdvice: Number[] = [];
  private randRecordInfo: Number[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public allAnswersService: AllAnswers, public adviceService: AdviceService, public infoService: InfoService, private httpClient: HttpClient) {
    this.ourPollinatorsService = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: CompleteAnswerSet) => {
      //Get location from retrievedAnswers
      this.longitude = retrievedAnswers.longitude;
      this.latitude = retrievedAnswers.latitude;

      //We are using 'subscribe' to detect when 'save' has been clicked and data emitted
      //When the advice set is produced, create advice Title and hide questions
      //Here we are toggling the visibility of the grid and email box using css
      document.getElementById('emailBoxID')!.classList.remove('hiddenElem');
      document.getElementById('adviceGridID')!.classList.remove('hiddenElem');
      document.getElementById('nearYouID')!.classList.remove('hiddenElem');
      // Here we are using ngIf to toggle visibility of multichoice Q
      this.multichoiceShow = false;
      this.responseShow = true;
    },
    err => {
      console.log(err);
    });
    this.fetchAdvice();
    this.fetchInfo();
  }

  // private fetchAdvice(){
  //   this.ourAdviceService = this.adviceService.getAnswerUpdateListener().subscribe((retrievedAdvice: AdviceGeneric[]) => {
  //     //find number of pieces of advice
  //     const noAdvice = retrievedAdvice.length;
  //     //If there isn't three pieces of advice for this garden, display the advice we do have
  //     if(noAdvice < 3){
  //       for(let i = 0; i < noAdvice; i++){
  //         this.ourAdvice[i] = retrievedAdvice[i];
  //       }
  //     }
  //     //If there is enough advice, choose three random pieces of advice
  //     else{
  //       for(let j = 0; j < 3; j++){
  //         let flag = "setCard";
  //         const rand = Math.floor(Math.random() * noAdvice);
  //         //Compare our random number with previous random
  //         //numbers to ensure no repeated cards
  //         for(let m = 0; m < this.randRecordAdvice.length; m++){
  //           if(this.randRecordAdvice[m] == rand){
  //             flag = "dontSet"
  //           }
  //         }
  //         if(flag == "setCard"){
  //           //this sets a cell in this.ourAdvice with the random retrievedAdvice
  //           this.ourAdvice[j] = retrievedAdvice[rand];
  //           //this stores which random advice we have used. This info is saved by the advice's position in the retrievedAdvice array (i.e. 1, 2, 7 etc)
  //           this.randRecordAdvice.push(rand);
  //           //this unhides the advice box that's just been populated
  //           document.getElementById('genericAdviceID' + j)!.classList.remove('hiddenElem');
  //         }
  //         //If we've found a repeat card, j-- to try again
  //         else{
  //           j--;
  //         }
  //       }
  //     }
  //   },
  //   err => {
  //     console.log(err);
  //   });
  // }

  private fetchAdvice(){
    this.ourAdviceService = this.adviceService.getAnswerUpdateListener().subscribe((retrievedAdvice: AdviceGeneric[]) => {
      let hedgehogCount = 0;
      let birdCount = 0;
      let insectCount = 0;
      let frogCount = 0;
      for(let i = 0; i < retrievedAdvice.length; i++){
        if(retrievedAdvice[i].Hedgehogs == "Y"){
          this.ourHedgehogAdvice[hedgehogCount] = retrievedAdvice[i];
          document.getElementById('hedgehogAdviceID' + hedgehogCount)!.classList.remove('hiddenElem');
          hedgehogCount++;
        }
        if(retrievedAdvice[i].Birds == "Y"){
          this.ourBirdsAdvice[birdCount] = retrievedAdvice[i];
          document.getElementById('birdsAdviceID' + birdCount)!.classList.remove('hiddenElem');
          birdCount++;
        }
        if(retrievedAdvice[i].Insects == "Y"){
          this.ourInsectsAdvice[insectCount] = retrievedAdvice[i];
          document.getElementById('insectsAdviceID' + insectCount)!.classList.remove('hiddenElem');
          insectCount++;
        }
        if(retrievedAdvice[i].Amphibians == "Y"){
          this.ourFrogsAdvice[frogCount] = retrievedAdvice[i];
          document.getElementById('frogsAdviceID' + frogCount)!.classList.remove('hiddenElem');
          frogCount++;
        }
      }
    },
    err => {
      console.log(err);
    });
  }

  // private fetchInfo(){
  //   this.ourInfoService = this.infoService.getAnswerUpdateListener().subscribe((retrievedInfo: InfoGeneric[]) => {
  //     //find number of pieces of info
  //     const noInfo = retrievedInfo.length;
  //     //If there isn't three pieces of info for this garden, display the info we do have
  //     if(noInfo < 3){
  //       for(let x = 0; x < noInfo; x++){
  //         this.ourInfo[x] = retrievedInfo[x];
  //         document.getElementById('genericInfoID' + x)!.classList.remove('hiddenElem');
  //       }
  //     }
  //     //If there is enough info, choose three random pieces of info
  //     else{
  //       for(let y = 0; y < 3; y++){
  //         let infoFlag = "setCard";
  //         const infoRand = Math.floor(Math.random() * noInfo);
  //         //Compare our random number with previous random
  //         //numbers to ensure no repeated cards
  //         for(let n = 0; n < this.randRecordInfo.length; n++){
  //           if(this.randRecordInfo[n] == infoRand){
  //             infoFlag = "dontSet"
  //           }
  //         }
  //         if(infoFlag == "setCard"){
  //           this.ourInfo[y] = retrievedInfo[infoRand];
  //           this.randRecordInfo.push(infoRand);
  //           document.getElementById('genericInfoID' + y)!.classList.remove('hiddenElem');
  //         }
  //         //If we've found a repeat card, y-- to try again
  //         else{
  //           y--;
  //         }
  //       }
  //     }
  //   },
  //   err => {
  //     console.log(err);
  //   });
  // }

  private fetchInfo(){
    this.ourInfoService = this.infoService.getAnswerUpdateListener().subscribe((retrievedInfo: InfoGeneric[]) => {
      let hedgehogCountInfo = 0;
      let birdCountInfo = 0;
      let insectCountInfo = 0;
      for(let j = 0; j < retrievedInfo.length; j++){
        if(retrievedInfo[j].Hedgehogs == "Y"){
          this.ourHedgehogInfo[hedgehogCountInfo] = retrievedInfo[j];
          document.getElementById('HedgehogInfoID' + hedgehogCountInfo)!.classList.remove('hiddenElem');
          hedgehogCountInfo++;
        }
        if(retrievedInfo[j].Birds == "Y"){
          this.ourBirdsInfo[birdCountInfo] = retrievedInfo[j];
          document.getElementById('BirdInfoID' + birdCountInfo)!.classList.remove('hiddenElem');
          birdCountInfo++;
        }
        if(retrievedInfo[j].Insects == "Y"){
          this.ourInsectsInfo[insectCountInfo] = retrievedInfo[j];
          document.getElementById('InsectInfoID' + insectCountInfo)!.classList.remove('hiddenElem');
          insectCountInfo++;
        }
      }
    },
    err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.ourPollinatorsService.unsubscribe();
    this.ourAdviceService.unsubscribe();
    this.ourInfoService.unsubscribe();
    this.extraSub.unsubscribe();
    // ******* We were experiencing a problem where, if you navigated away from the advice page and back and then
    //tried to get more advice it would crash the site. This is (presumably?) because there was still data being held by
    //the wildlife-advice-page components, so that when more data was added was inserted into the components the site crashed.
    //This is a very imperfect fix for this problem. '@HostListener('unloaded')' assures that whenever we exit the advice page,
    //ngOnDestroy() is called. 'window.location.reload();' then triggers the page (and therefore site) to reload. This prevents the crash. This is 
    //against the principle of a single page application, and so will be the first thing to fix if we have time!
    window.location.reload();
  }

  /**********************************************************************
   **********************************************************************
   ********* LOGIC TO HANDLE ADVICE THAT WILL BE SAVED AS GEOJSON ********
   **********************************************************************
   ***********************************************************************/

  //the email that the user has submitted
  private email = "";

  //the user's longitude and latitude
  public longitude: Number = 0; 
  public latitude: Number = 0; 

  //array which holds saved advice 
  private savedAdvice: AdviceSave[] = [];

  /* An array of saved advice is created and passed to all children. When 'save this advice' is clicked in an advice box, it adds a data entry to this
  array. When a user submits their email, this array is wrapped up with the email and location (retrieved from CompleteAnswerSet) and added to the database as geojson.
  Therefore, it may be useful to generate longitude/latitude in locationInfo.
  We can also create a InYourLocalArea component which takes the user's location and searches the same database for people who are near enough to give advice.*/

  public addAdvice(advice: AdviceSave) {
    this.savedAdvice.push(advice);
  }

  public removeAdvice(advice: String) {
    this.savedAdvice.forEach((value,index)=>{
      if(value.Header==advice){
        this.savedAdvice.splice(index,1);
      }
    });  
  }

  //Triggered by processEmailData() below
  private saveUserData(){
    //Correct order of coordinates in geojson is [longitude, latitude, elevation] https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.1
    const geoJsonObj: UserDataSave = {
      "type": "Feature",
      "properties": {
        "email": this.email,
        "savedAdvice": this.savedAdvice,
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          this.longitude, this.latitude
        ]
      }
    };
    //************* this line may not need to include a .subscribe()
    //check for err????
    this.extraSub = this.httpClient.post("http://localhost:3000/api/userData", geoJsonObj).subscribe();
  }

  /***********************************************************************
   ***********************************************************************
   ************************ LOGIC TO HANDLE EMAILS ***********************
   ***********************************************************************
   ***********************************************************************/

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  public processEmailData(){
    this.email = this.emailFormControl.value;
    this.sendEmail()
    this.saveUserData();
  }

  private sendEmail(){
    if(this.savedAdvice.length == 0){
      alert("You haven't saved any advice yet! Please select some advice and then re-enter your email.");
    }
    else{
      const emailContent = { email: this.email, emailBody: this.getEmailContent()};
      axios.post('http://localhost:3000/api/sendmail', emailContent)
      .then(response => {
        alert("An email was sent to " + this.email + ". Happy gardening!");
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }
  }

  private getEmailContent(): String{
    let htmlString: String = '<head><link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"></head><body>' + 
        '<p style="text-align: center; font-family:' + "'Playfair Display'" + ', serif; font-size: 30px;">Thank you for using Rewild My Garden!</p>' +
        '<p style="text-align: center; font-size: 20px">Please see the advice you saved below: </p><br>';

    for(let i=0; i<this.savedAdvice.length; i++){
      htmlString = htmlString +"<div>" +
        // this isn't working because the image source isn't a web link yet
        // "<img src='" + this.savedAdvice[i].Pathname + "' width='250' height='250' alt='advice_img'>" +
        "<div>" +
          '<p style="font-family:' + "'Playfair Display'" + ', serif; font-size: 20px; line-height: 0.8;">' + this.savedAdvice[i].Header + '</p>' +
          "<p><b>Why You Should Try This in Your Garden: </b>" + this.savedAdvice[i].Justification + "</p>" +
          "<p><b>How To Do It: </b>" + this.savedAdvice[i].BodyText + "</p>" +
        '</div>' +
        '<br>';
    }
    htmlString = htmlString + "</body>"
    return htmlString;
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
