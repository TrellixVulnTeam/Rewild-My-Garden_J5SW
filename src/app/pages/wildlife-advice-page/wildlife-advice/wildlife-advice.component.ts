import { Component, OnInit } from '@angular/core';
import { NoSpaceMinimalTestData } from '../../../noSpaceMinimalTestData.model'; 
import { HttpClient } from '@angular/common/http';
import { WildlifeAnswerSet } from '../wildlife-answers.model';
import { WildlifeAnswers } from '../wildlife-answers.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wildlife-advice',
  templateUrl: './wildlife-advice.component.html',
  styleUrls: ['./wildlife-advice.component.scss']
})
export class WildlifeAdviceComponent implements OnInit {

  private ourAnswers: WildlifeAnswerSet[] = [];
  private ourAnswer: WildlifeAnswerSet = {soil: "", ph: "", shade: ""};
  public noSpaceMinimalTestData: NoSpaceMinimalTestData[] = [];

  //The subscription object is used to manage the subscription- when we have multiple pages &c, we want to make sure that we're not holding data when we're not putting anything
  // on the DOM, as otherwise this could cause a memory leak. This is what Subscription helps manage
  private answersSub: Subscription = new Subscription;

  //These variables are set so that we can query our api and filter data according to users' specifications
  private reqHabit : String = "Perennial";
  private reqSoilQueryType : String = "";
  private reqPHQueryType : String = "";
  private reqShadeQueryType : String = "";
  private reqFloweringQueryType : String = "FloweringJune";

  constructor(private httpClient: HttpClient, public wildlifeAnswersService: WildlifeAnswers) {
    //here we are subscribing to the listener
    this.answersSub = this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: WildlifeAnswerSet[]) => {
      this.ourAnswers = retrievedAnswers;
      //This needs checking that we're not returning a null - ! is currently acting as a plaster for this.
      this.ourAnswer = this.ourAnswers.pop()!;
      
      this.reqSoilQueryType= this.ourAnswer.soil;
      this.reqPHQueryType= this.ourAnswer.ph;
      this.reqShadeQueryType= this.ourAnswer.shade;

      // This pulls data from our minimalTestDataFilter api page
      const REST_API_SERVER = this.getAPI();

      //then use that data to filter API data for display
      this.httpClient.get<any>(REST_API_SERVER).subscribe((response)=>{
        this.noSpaceMinimalTestData = response;
      });
    });
  }

  getAPI(){
    // Responses are all always set to "Y" because we're never testing for something NOT appropriate for a garden (in the the context of what our site does)
    return "http://localhost:3000/api/minimalTestDataFilter?" + 
    "Habit=" + this.reqHabit + 
    "&SoilQueryType=" + this.reqSoilQueryType + "&Soil=Y" +
    "&ShadeQueryType=" + this.reqShadeQueryType + "&Shade=Y" +
    "&PHQueryType=" + this.reqPHQueryType + "&PH=Y" + 
    "&FloweringQueryType=" + this.reqFloweringQueryType + "&Flowering=Y";
  }
  
  ngOnInit() {}

  //This is called whenever this component is about to be removed from the DOM
  ngOnDestroy(){
    //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
    this.answersSub.unsubscribe();
  }
}