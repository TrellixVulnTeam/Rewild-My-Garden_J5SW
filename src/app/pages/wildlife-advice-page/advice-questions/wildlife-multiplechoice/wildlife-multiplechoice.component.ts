import { Component, OnInit } from '@angular/core';
import { WildlifeAnswers } from '../../services/multichoice-answers.service';

@Component({
  selector: 'app-wildlife-multiplechoice',
  templateUrl: './wildlife-multiplechoice.component.html',
  styleUrls: ['./wildlife-multiplechoice.component.scss']
})

export class WildlifeMultiplechoiceComponent implements OnInit {
  chosenSoilType: String = "";
  soilTypes: String[] = ['Light, Sandy Soil', 'Medium-Weight Soil', 'Heavy, Clay Soil', "I Don't Know"];
  chosenPHType: String = "";
  PHTypes: String[] = ['Acidic Soil', 'Neutral Soil', 'Alkaline Soil', "I Don't Know"];
  chosenShadeType: String = "";
  shadeTypes: String[] = ['No Shade', 'Medium Shade', 'Heavy Shade', 'Multiple Levels of Shadiness'];
  chosenSize: String = "";
  sizes: String[] = ['A Window Box', 'Plant Pots Outside on a Patio or Balcony', 'A Small Garden', 'A Large Garden', 'An Allotment', 'A Field or Multiple Fields'];
  errMessage: String = "";

  //multichoice checkbox question
  childFriendly: String = "";
  cheap: String = "";
  easy: String = "";
  renting: String = "";
  pavedGardens: String = "";

  constructor(public wildlifeAnswersService: WildlifeAnswers) {
  }

  ngOnInit(): void {
    document.getElementById('intro')!.classList.remove('hiddenQ');
    document.getElementById('next-intro')!.classList.remove('hiddenQ');
  }

  public startQuestionnaire(){
    //hide question one
    document.getElementById('intro')!.classList.add('hiddenQ');
    document.getElementById('next-intro')!.classList.add('hiddenQ');
    //show question two
    document.getElementById('question-one')!.classList.remove('hiddenQ');
    document.getElementById('next-one')!.classList.remove('hiddenQ');
  }

  public tryNextOne(){
    if(this.chosenSize == ""){
      document.getElementById('errMessage')!.innerHTML = "Please answer this question to continue";
      return;
    }
    else{
      //hide question one
      document.getElementById('question-one')!.classList.add('hiddenQ');
      document.getElementById('next-one')!.classList.add('hiddenQ');
      document.getElementById('errMessage')!.innerHTML = "";
      //show question two
      document.getElementById('question-two')!.classList.remove('hiddenQ');
      document.getElementById('next-two')!.classList.remove('hiddenQ');
    }
  }

  public tryNextTwo(){
    if(this.chosenSoilType == ""){
      document.getElementById('errMessage')!.innerHTML = "Please answer this question to continue";
      return;
    }
    else{
      //hide question two
      document.getElementById('question-two')!.classList.add('hiddenQ');
      document.getElementById('next-two')!.classList.add('hiddenQ');
      document.getElementById('errMessage')!.innerHTML = "";
      //show question three
      document.getElementById('question-three')!.classList.remove('hiddenQ');
      document.getElementById('next-three')!.classList.remove('hiddenQ');
    }
  }

  public tryNextThree(){
    if(this.chosenPHType == ""){
      document.getElementById('errMessage')!.innerHTML = "Please answer this question to continue";
      return;
    }
    else{
      //hide question three
      document.getElementById('question-three')!.classList.add('hiddenQ');
      document.getElementById('next-three')!.classList.add('hiddenQ');
      document.getElementById('errMessage')!.innerHTML = "";
      //show question four
      document.getElementById('question-four')!.classList.remove('hiddenQ');
      document.getElementById('next-four')!.classList.remove('hiddenQ');
    }
  }

  public tryNextFour(){
    if(this.chosenShadeType == ""){
      document.getElementById('errMessage')!.innerHTML = "Please answer this question to continue";
      return;
    }
    else{
      //hide question four
      document.getElementById('question-four')!.classList.add('hiddenQ');
      document.getElementById('next-four')!.classList.add('hiddenQ');
      document.getElementById('errMessage')!.innerHTML = "";
      //show question five
      document.getElementById('question-five')!.classList.remove('hiddenQ');
    }
  }

  public tryNextFive(){
    //This question handles its own errors, so just transition questions
    //hide question five
    document.getElementById('question-five')!.classList.add('hiddenQ');
    document.getElementById('errMessage')!.innerHTML = "";
    //show question six
    document.getElementById('question-six')!.classList.remove('hiddenQ');
    document.getElementById('next-six')!.classList.remove('hiddenQ');
  }

  //Create 'multiple choice answers object' and send that to wildlife answers service
  public tryNextSixAndSave(){
    console.log("clicked save");
    //This question doesn't have to have an answers, so no checking
    //A response is composed of the results from multiple tick boxes!
    this.wildlifeAnswersService.addAnswerSet(this.chosenSoilType, this.chosenPHType, this.chosenShadeType, this.chosenSize, this.childFriendly, this.cheap, this.easy, this.renting, this.pavedGardens);
  }
}
