import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  public adviceOne: AdviceGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public adviceTwo: AdviceGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public adviceThree: AdviceGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public ourAdvice: AdviceGeneric[] = [this.adviceOne, this.adviceTwo, this.adviceThree];

  public infoOne: InfoGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "BodyText": ""};
  public infoTwo: InfoGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "BodyText": ""};
  public infoThree: InfoGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "BodyText": ""};
  public ourInfo: InfoGeneric[] = [this.infoOne, this.infoTwo, this.infoThree];

  private randRecordAdvice: Number[] = [];
  private randRecordInfo: Number[] = [];

  constructor(public allAnswersService: AllAnswers, public adviceService: AdviceService, public infoService: InfoService, private httpClient: HttpClient) {
    this.ourPollinatorsService = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: CompleteAnswerSet) => {
      //Get location from retrievedAnswers
      this.longitude = retrievedAnswers.longitude;
      this.latitude = retrievedAnswers.latitude;

      //We are using 'subscribe' to detect when 'save' has been clicked and data emitted
      //When the advice set is produced, create advice Title and hide questions
      //Here we are toggling the visibility of the grid and email box using css
      document.getElementById('emailBoxID')!.classList.remove('hiddenElem');
      document.getElementById('adviceGridID')!.classList.remove('hiddenElem');
      // Here we are using ngIf to toggle visibility of multichoice Q
      this.multichoiceShow = false;
      this.responseShow = true;
    });
    this.fetchAdvice();
    this.fetchInfo();
  }

  private fetchAdvice(){
    this.ourAdviceService = this.adviceService.getAnswerUpdateListener().subscribe((retrievedAdvice: AdviceGeneric[]) => {
      //find number of pieces of advice
      var noAdvice = retrievedAdvice.length;
      //If there isn't three pieces of advice for this garden, display the advice we do have
      if(noAdvice < 3){
        for(var i = 0; i < noAdvice; i++){
          this.ourAdvice[i] = retrievedAdvice[i];
        }
      }
      //If there is enough advice, choose three random pieces of advice
      else{
        for(var j = 0; j < 3; j++){
          var flag = "setCard"
          var rand = Math.floor( Math.random() * noAdvice);
          //Compare our random number with previous random
          //numbers to ensure no repeated cards
          for(var m = 0; m < this.randRecordAdvice.length; m++){
            if(this.randRecordAdvice[m] == rand){
              flag = "dontSet"
            }
          }
          if(flag == "setCard"){
            //this sets a cell in this.ourAdvice with the random retrievedAdvice
            this.ourAdvice[j] = retrievedAdvice[rand];
            //this stores which random advice we have used. This info is saved by the advice's position in the retrievedAdvice array (i.e. 1, 2, 7 etc)
            this.randRecordAdvice.push(rand);
            //this unhides the advice box that's just been populated
            document.getElementById('genericAdviceID' + j)!.classList.remove('hiddenElem');
          }
          //If we've found a repeat card, j-- to try again
          else{
            j--;
          }
        }
      }
    });
  }

  private fetchInfo(){
    this.ourInfoService = this.infoService.getAnswerUpdateListener().subscribe((retrievedInfo: InfoGeneric[]) => {
      //find number of pieces of info
      var noInfo = retrievedInfo.length;
      //If there isn't three pieces of info for this garden, display the info we do have
      if(noInfo < 3){
        for(var x = 0; x < noInfo; x++){
          this.ourInfo[x] = retrievedInfo[x];
          document.getElementById('genericInfoID' + x)!.classList.remove('hiddenElem');
        }
      }
      //If there is enough info, choose three random pieces of info
      else{
        for(var y = 0; y < 3; y++){
          var infoFlag = "setCard"
          var infoRand = Math.floor( Math.random() * noInfo);
          //Compare our random number with previous random
          //numbers to ensure no repeated cards
          for(var n = 0; n < this.randRecordInfo.length; n++){
            if(this.randRecordInfo[n] == infoRand){
              infoFlag = "dontSet"
            }
          }
          if(infoFlag == "setCard"){
            this.ourInfo[y] = retrievedInfo[infoRand];
            this.randRecordInfo.push(infoRand);
            document.getElementById('genericInfoID' + y)!.classList.remove('hiddenElem');
          }
          //If we've found a repeat card, y-- to try again
          else{
            y--;
          }
        }
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ourPollinatorsService.unsubscribe();
    this.ourAdviceService.unsubscribe();
    this.ourInfoService.unsubscribe();
  }

  /**********************************************************************
   **********************************************************************
   ********* LOGIC TO HANDLE ADVICE THAT WILL BE SAVED AS GEOJSON ********
   **********************************************************************
   ***********************************************************************/

  //the email that the user has submitted
  private email = "bob@gmail.com"; /*Placeholder*/

  //the user's longitude and latitude
  private longitude: Number = 0; 
  private latitude: Number = 0; 

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

  public processEmailData(){
    // Will need to do this!!
    // this.sendEmail()
    this.saveUserData();
  }

  private saveUserData(){
    var geoJsonObj : UserDataSave = {
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
        }
    console.log(geoJsonObj);

    this.httpClient.post("http://localhost:3000/api/userData", geoJsonObj).subscribe();
  }
}
