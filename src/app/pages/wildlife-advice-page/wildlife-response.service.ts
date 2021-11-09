import { Injectable } from '@angular/core';
import { WildlifeAnswerSet } from './wildlife-answers.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { GridResponse } from './grid-response.model';
import { Component, OnInit } from '@angular/core';
import { UnfinishedPollinatorData } from '../../unfinishedPollinatorData.model'; 
import { HttpClient } from '@angular/common/http';
import { WildlifeAnswers } from './wildlife-answers.service';

//Check this is right?
@Injectable({providedIn: 'root'})
export class WildlifeResponse{
    
    //Subscriptions to wildlife answers data
    private answersSub: Subscription = new Subscription;
    private ourAnswer: WildlifeAnswerSet = {soil: "", ph: "", shade: ""};

    //These variables are set so that we can query our api and filter data according to users' specifications
    private reqSoilQueryType : String = "";
    private reqPHQueryType : String = "";
    private reqShadeQueryType : String = "";
  
    //Response object that will be displayed in our html
    private marchGridResponse: GridResponse =  {Title: "March", Month: "FloweringMarch", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
    private aprilGridResponse: GridResponse =  {Title: "April", Month: "FloweringApril", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
    private mayGridResponse: GridResponse =  {Title: "May", Month: "FloweringMay", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
    private juneGridResponse: GridResponse =  {Title: "June", Month: "FloweringJune", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
    private julyGridResponse: GridResponse =  {Title: "July", Month: "FloweringJuly", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
    private augustGridResponse: GridResponse =  {Title: "August", Month: "FloweringAugust", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
    private septGridResponse: GridResponse =  {Title: "September", Month: "FloweringSept", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
    private octGridResponse: GridResponse =  {Title: "October", Month: "FloweringOct", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
    private novGridResponse: GridResponse =  {Title: "November", Month: "FloweringNov", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  
    //Our final data
    public monthsUsed: GridResponse[] = [this.marchGridResponse, this.aprilGridResponse, this.mayGridResponse, this.juneGridResponse, this.julyGridResponse, this.augustGridResponse, this.septGridResponse, this.octGridResponse, this.novGridResponse]
    public unfinishedPollinatorData: UnfinishedPollinatorData[] = [];

    //Our listener objects
    private updatedPollinatorData = new Subject<UnfinishedPollinatorData[]>();
    private updatedMonthsUsed = new Subject<GridResponse[]>();

    
  
    constructor(private httpClient: HttpClient, public wildlifeAnswersService: WildlifeAnswers) {
      //here we are subscribing to the listener
      this.answersSub = this.wildlifeAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: WildlifeAnswerSet[]) => {
        this.assignUserAnswers(retrievedAnswers);
  
        for (let i = 0; i < this.monthsUsed.length; i++) {
          this.getGridData(i);
          this.createSubObjects();
        }
      });
    }

    public getPollinatorDataListener(): Observable<any>{
        return this.updatedPollinatorData.asObservable();
    }

    public getMonthsUsedListener(): Observable<any>{
        return this.updatedMonthsUsed.asObservable();
    }

    private assignUserAnswers(retrievedAnswers: WildlifeAnswerSet[]){
      //This needs checking that we're not returning a null - ! is currently acting as a plaster for this.
      this.ourAnswer = retrievedAnswers.pop()!;
  
      this.reqSoilQueryType= this.ourAnswer.soil;
      this.reqPHQueryType= this.ourAnswer.ph;
      this.reqShadeQueryType= this.ourAnswer.shade;
    }
  
    private getGridData(i: number){
      const REST_API_SERVER = this.getAPI(i);
  
      //then use that data to filter API data for display
      this.httpClient.get<any>(REST_API_SERVER).subscribe((response)=>{
        this.unfinishedPollinatorData = response;
        //Choose a random plant from the array of appropriate plants
        var rand = Math.floor( Math.random() * this.unfinishedPollinatorData.length);
        this.monthsUsed[i].LatinName = this.unfinishedPollinatorData[rand].LatinName;
        this.monthsUsed[i].CommonName = this.unfinishedPollinatorData[rand].CommonName;
        this.monthsUsed[i].Habit = this.unfinishedPollinatorData[rand].Habit;
        this.monthsUsed[i].Height = this.unfinishedPollinatorData[rand].Height;
        this.monthsUsed[i].Growth = this.unfinishedPollinatorData[rand].Growth;
        this.monthsUsed[i].Native = this.unfinishedPollinatorData[rand].Native;
        this.monthsUsed[i].Pathname = this.unfinishedPollinatorData[rand].Pathname;
        this.monthsUsed[i].Name = this.unfinishedPollinatorData[rand].Name;
        this.monthsUsed[i].Username = this.unfinishedPollinatorData[rand].Username;
        this.monthsUsed[i].Copyright = this.unfinishedPollinatorData[rand].Copyright;
        this.monthsUsed[i].Link = this.unfinishedPollinatorData[rand].Link;
      });
      
    }
  
    private getAPI(i: number){
      // Responses are all always set to "Y" because we're never testing for something NOT appropriate for a garden (in the the context of what our site does)
      // Because we are cycling through floweringType queries, it is a local variable not a global one
      return "http://localhost:3000/api/minimalTestDataFilter?" + 
      "SoilQueryType=" + this.reqSoilQueryType + "&Soil=Y" +
      "&ShadeQueryType=" + this.reqShadeQueryType + "&Shade=Y" +
      "&PHQueryType=" + this.reqPHQueryType + "&PH=Y" + 
      "&FloweringQueryType=" + this.monthsUsed[i].Month + "&Flowering=Y";
    }

    private createSubObjects(){
        this.updatedPollinatorData.next([...this.unfinishedPollinatorData]);
        this.updatedMonthsUsed.next([...this.monthsUsed]);
    }
    
    ngOnInit() {}
  
    //This is called whenever this component is about to be removed from the DOM
    ngOnDestroy(){
      //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
      this.answersSub.unsubscribe();
    }
}