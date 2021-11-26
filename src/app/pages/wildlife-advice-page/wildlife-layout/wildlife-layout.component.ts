import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdviceGeneric } from '../models/advice.model';
import { CompleteAnswerSet } from '../models/all-answers.model';
import { InfoGeneric } from '../models/info.model';
import { AdviceService } from '../services/advice-boxes.service';
import { AllAnswers } from '../services/all-answers.service';
import { InfoService } from '../services/info-boxes.service';

@Component({
  selector: 'app-wildlife-layout',
  templateUrl: './wildlife-layout.component.html',
  styleUrls: ['./wildlife-layout.component.scss']
})
export class WildlifeLayoutComponent implements OnInit {

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

  constructor(public allAnswersService: AllAnswers, public adviceService: AdviceService, public infoService: InfoService) {

    //When the advice set is produced, create advice Title and hide questions
    //Find a better way of triggering elements hiding/unhiding !!!!! ******
    this.ourPollinatorsService = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: CompleteAnswerSet[]) => {
      //We are using 'subscribe' to detect when 'save' has been clicked and data emitted
      //Here we are toggling the visibility of the grid using css
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
            this.ourAdvice[j] = retrievedAdvice[rand];
            this.randRecordAdvice.push(rand);
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
}
