// import { HttpClient } from '@angular/common/http';
// import { Component, Input, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { AdviceGeneric } from '../models/advice.model';
// import { InfoGeneric } from '../models/info.model';
// import { WildlifeAnswerSet } from '../models/multichoice-answers.model';
// import { WildlifeAnswers } from '../services/multichoice-answers.service';
// import { AdviceService } from '../services/advice-boxes.service';
// import { InfoService } from '../services/info-boxes.service';

// @Component({
//   selector: 'app-wildlife-layout',
//   templateUrl: './wildlife-layout.component.html',
//   styleUrls: ['./wildlife-layout.component.scss']
// })
// export class WildlifeLayoutComponent implements OnInit {

//   //Subscriptions to wildlife answers data
//   private answersSub: Subscription = new Subscription();
//   private adviceSub: Subscription = new Subscription();
//   private infoSub: Subscription = new Subscription();

//   private allAdvice: AdviceGeneric[] = [];
//   private allInfo: InfoGeneric[] = [];

//   public adviceOne: AdviceGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
//   public adviceTwo: AdviceGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
//   public adviceThree: AdviceGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};

//   public multichoiceShow: boolean = true;

//   constructor(private httpClient: HttpClient, public wildlifeAnswersService: WildlifeAnswers, public infoService: InfoService, public adviceService: AdviceService) {
//     //here we are subscribing to the listener
//     //Find a better way of triggering elements hiding/unhiding !!!!!
//     this.answersSub = this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: WildlifeAnswerSet[]) => {
//       //When the advice set is produced, hide questions and show answers
//       //Here we are using ngIf to toggle visibility of multichoice Q
//       this.multichoiceShow = false;
//       //Here we are toggling the visibility of the grid using css
//       document.getElementById('adviceGridID')!.classList.remove('hiddenElem');
//       document.getElementById('genericAdviceID')!.classList.remove('hiddenElem');
//     });
//     // this.adviceSub = this.adviceService.getAnswerUpdateListener().subscribe((retrievedAdvice: AdviceGeneric[]) => {
//     //   this.adviceOne = retrievedAdvice[0];
//     //   this.adviceTwo = retrievedAdvice[0];
//     //   this.adviceThree = retrievedAdvice[0];
//     // });
//     // this.infoSub = this.infoService.getAnswerUpdateListener().subscribe((retrievedInfo: InfoGeneric[]) => {
//     // });
//   }

//   //This is called whenever this component is about to be removed from the DOM
//   ngOnDestroy() {
//     //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
//     this.answersSub.unsubscribe();
//     // this.adviceSub.unsubscribe();
//     // this.infoSub.unsubscribe();
//   }

//   ngOnInit(): void {
//   }

// }

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdviceGeneric } from '../models/advice.model';
import { InfoGeneric } from '../models/info.model';
import { WildlifeAnswerSet } from '../models/multichoice-answers.model';
import { AdviceService } from '../services/advice-boxes.service';
import { InfoService } from '../services/info-boxes.service';
import { WildlifeAnswers } from '../services/multichoice-answers.service';

@Component({
  selector: 'app-wildlife-layout',
  templateUrl: './wildlife-layout.component.html',
  styleUrls: ['./wildlife-layout.component.scss']
})
export class WildlifeLayoutComponent implements OnInit {

  public multichoiceShow: boolean = true;

  private allAdvice: AdviceGeneric[] = [];
  private allInfo: InfoGeneric[] = [];

  private ourPollinatorsService: Subscription = new Subscription();
  private ourAdviceService: Subscription = new Subscription();
  private ourInfoService: Subscription = new Subscription();

  public adviceOne: AdviceGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public adviceTwo: AdviceGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public adviceThree: AdviceGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "Justification": "", "BodyText": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public infoOne: InfoGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "BodyText": ""};
  public infoTwo: InfoGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "BodyText": ""};
  public infoThree: InfoGeneric = {"Header": "", "WindoxBox": "", "OutdoorPlantPots": "", "SmallGarden": "", "LargeGarden": "", "Allotment": "", "FieldFields": "", "BodyText": ""};

  constructor(public wildlifeAnswersService: WildlifeAnswers, public adviceService: AdviceService, public infoService: InfoService) {
    //When the advice set is produced, create advice Title and hide questions
    //Find a better way of triggering elements hiding/unhiding !!!!!
    this.ourPollinatorsService = this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: WildlifeAnswerSet[]) => {
      //We are using 'subscribe' to detect when 'save' has been clicked and data emitted
      //Here we are toggling the visibility of the grid using css
      document.getElementById('adviceGridID')!.classList.remove('hiddenElem');
      // Here we are using ngIf to toggle visibility of multichoice Q
      this.multichoiceShow = false;
    });

    this.ourAdviceService = this.adviceService.getAnswerUpdateListener().subscribe((retrievedAdvice: AdviceGeneric[]) => {
      this.adviceOne = retrievedAdvice[0];
      this.adviceTwo = retrievedAdvice[1];
      this.adviceThree = retrievedAdvice[2];
      document.getElementById('genericAdviceID1')!.classList.remove('hiddenElem');
      document.getElementById('genericAdviceID2')!.classList.remove('hiddenElem');
      // document.getElementById('genericAdviceID3')!.classList.remove('hiddenElem');
    });

    this.ourInfoService = this.infoService.getAnswerUpdateListener().subscribe((retrievedInfo: InfoGeneric[]) => {
      this.infoOne = retrievedInfo[0];
      this.infoTwo = retrievedInfo[1];
      this.infoThree = retrievedInfo[2];
      document.getElementById('genericInfoID1')!.classList.remove('hiddenElem');
      document.getElementById('genericInfoID2')!.classList.remove('hiddenElem');
      document.getElementById('genericInfoID3')!.classList.remove('hiddenElem');
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ourPollinatorsService.unsubscribe();
    this.ourAdviceService.unsubscribe();
    // this.infoSub.unsubscribe();
  }
}
