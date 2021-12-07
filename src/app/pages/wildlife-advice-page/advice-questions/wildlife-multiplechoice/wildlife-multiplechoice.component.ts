import { Component, OnInit } from '@angular/core';
import { WildlifeAnswers } from '../../services/multichoice-answers.service';

@Component({
  selector: 'app-wildlife-multiplechoice',
  templateUrl: './wildlife-multiplechoice.component.html',
  styleUrls: ['./wildlife-multiplechoice.component.scss']
})

export class WildlifeMultiplechoiceComponent implements OnInit {
  //multichoice radio questions
  chosenSoilType: String = "";
  soilTypes: String[] = ['SoilLight', 'SoilMedium', 'SoilHeavy'];
  chosenPHType: String = "";
  PHTypes: String[] = ['PHAcid', 'PHNeutral', 'PHBasicAlkaline'];
  chosenShadeType: String = "";
  shadeTypes: String[] = ['ShadeNone', 'ShadeSemi', 'ShadeFull'];
  chosenSize: String = "";
  sizes: String[] = ['WindoxBox', 'OutdoorPlantPots', 'SmallGarden', 'LargeGarden', 'Allotment', 'FieldFields'];
  errMessage: String = "";

  //multichoice checkbox question
  childFriendly: String = "";
  cheap: String = "";
  easy: String = "";
  renting: String = "";
  pavedGardens: String = "";

  constructor(public wildlifeAnswersService: WildlifeAnswers) { }

  //Create 'multiple choice answers object' and send that to wildlife answers service
  async saveForm(){
    if(this.chosenSoilType == "" || this.chosenPHType == "" || this.chosenShadeType == "" || this.chosenSize == ""){
      //If unsuccessful, set error message, do not send data
      document.getElementById('errMessage')!.innerHTML = "Please answer all questions to get your result!";
      return;
    }
    else{
      //If successful, clear error message
      document.getElementById("errMessage")!.innerHTML = "";
      console.log(this.childFriendly + " " + this.cheap + " " + this.easy + " " + this.renting + " " + this.pavedGardens);
      //A response is composed of the results from mutliple tick boxes!
      this.wildlifeAnswersService.addAnswerSet(this.chosenSoilType, this.chosenPHType, this.chosenShadeType, this.chosenSize, this.childFriendly, this.cheap, this.easy, this.renting, this.pavedGardens);
    }
  }

  ngOnInit(): void {
  }
}
