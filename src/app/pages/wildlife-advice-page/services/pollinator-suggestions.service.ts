import { Injectable } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { GridResponse } from "../models/pollinator-visible.model";
import { UnfinishedPollinatorData } from "../models/pollinator-data.model";
import { HttpClient } from "@angular/common/http";
import { CompleteAnswerSet } from "../models/all-answers.model";
import { AllAnswers } from "./all-answers.service";

//Check this is right?
@Injectable({ providedIn: "root" })
export class WildlifeResponse {

  //Subscriptions to wildlife answers data
  private answersSub: Subscription = new Subscription();

  //These variables are set so that we can query our api and filter data according to users' specifications
  private reqSoilQueryType: String = "";
  private reqPHQueryType: String = "";
  private reqShadeQueryType: String = "";
  private reqHardinessQueryType: String = "";

  //Our final 2d data array
  public allMonthsUsed : GridResponse[][] = new Array<Array<GridResponse>>(8);

  private counter = 0;

  //This provides info corresponding to allMonthsUsed for each month
  private infoArr = [
    { Title: "March", Month: "FloweringMarch" },
    { Title: "April", Month: "FloweringApril" },
    { Title: "May", Month: "FloweringMay" },
    { Title: "June", Month: "FloweringJune" },
    { Title: "July", Month: "FloweringJuly" },
    { Title: "August", Month: "FloweringAugust" },
    { Title: "September", Month: "FloweringSept" },
    { Title: "October", Month: "FloweringOct" },
  ];

  //Our listener objects
  private updatedMonthsUsed = new Subject<GridResponse[][]>();

  constructor(private httpClient: HttpClient, public allAnswersService: AllAnswers) {
    //here we are subscribing to the listener
    this.answersSub = this.allAnswersService.getAnswerUpdateListener().subscribe((retrievedAnswers: CompleteAnswerSet) => {
        this.assignUserAnswers(retrievedAnswers);
        this.getGridData();
      });
  }

  public getMonthsUsedListener(): Observable<GridResponse[][]> {
    return this.updatedMonthsUsed.asObservable();
  }

  private assignUserAnswers(retrievedAnswers: CompleteAnswerSet) {
    this.reqSoilQueryType = retrievedAnswers.soil;
    this.reqPHQueryType = retrievedAnswers.ph;
    this.reqShadeQueryType = retrievedAnswers.shade;
    //The format of the query is "Hardiness1", "Hardiness2" etc, but retrievedAnswers.hardiness is just the number part
    this.reqHardinessQueryType = "Hardiness" + retrievedAnswers.hardiness;
  }

  private getGridData(){
      //get API string
      const REST_API_SERVER = this.getAPI(this.infoArr[this.counter].Month);
      //Then use that data to filter API data for display
      this.httpClient.get<UnfinishedPollinatorData[]>(REST_API_SERVER).subscribe(
        response => {
        let allDataThisMonth: UnfinishedPollinatorData[] = response;
        this.allMonthsUsed[this.counter] = this.populateMonth(this.counter, allDataThisMonth, this.infoArr[this.counter].Title);
        //Using recursion to loop through all 8 months
        if(this.counter == 7){
          this.createSubObjects();
          return;
        }
        else{
          this.counter++;
          this.getGridData();
        }
      });
  }

  private populateMonth(i: number, allDataThisMonth: UnfinishedPollinatorData[], monthTitle: String) : GridResponse[]{
    //Create a new month array for new cell of allMonthsUsed (i.e, create data array for the new month)
    var monthData : GridResponse[] = [];
    //Every plant we can find associated with this month is added to this month's array
    for (let j = 0; j < allDataThisMonth.length; j++) {
      //Creating a new blank grid response
      monthData[j] = {"Title": "", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
      monthData[j].Title = monthTitle;
      monthData[j].LatinName = allDataThisMonth[j].LatinName;
      monthData[j].CommonName = allDataThisMonth[j].CommonName;
      monthData[j].Height = allDataThisMonth[j].Height;
      monthData[j].Habit = allDataThisMonth[j].Habit;
      monthData[j].Growth = allDataThisMonth[j].Growth;
      monthData[j].Native = allDataThisMonth[j].Native;
      monthData[j].Pathname = allDataThisMonth[j].Pathname;
      monthData[j].Name = allDataThisMonth[j].Name;
      monthData[j].Username = allDataThisMonth[j].Username;
      monthData[j].Copyright = allDataThisMonth[j].Copyright;
      monthData[j].Link = allDataThisMonth[j].Link;
    }
    return monthData;
  }

  private getAPI(monthReq: String) {
    // Responses are all always set to "Y" because we're never testing for something NOT appropriate for a garden (in the the context of what our site does)
    // Because we are cycling through floweringType queries, it is a local variable not a global one
    return (
      "http://localhost:3000/api/minimalTestDataFilter?" +
      "SoilQueryType=" +
      this.reqSoilQueryType +
      "&Soil=Y" +
      "&ShadeQueryType=" +
      this.reqShadeQueryType +
      "&Shade=Y" +
      "&PHQueryType=" +
      this.reqPHQueryType +
      "&PH=Y" +
      "&FloweringQueryType=" +
      monthReq +
      "&Flowering=Y" +
      "&HardinessQueryType=" +
      this.reqHardinessQueryType +
      "&Hardiness=Y"
    );
  }

  private createSubObjects() {
    //We are now sending our ACTUAL array as opposed to a copy. We do nothing to the dat of the other end, so this shouldn't
    //be a problem, but it's a good idea to take note of this ! Creating a duplicate of a multidimensional array would require an
    //explicit copy of each cell
    this.updatedMonthsUsed.next(this.allMonthsUsed);
  }

  ngOnInit() {}

  //This is called whenever this component is about to be removed from the DOM
  ngOnDestroy() {
    //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
    this.answersSub.unsubscribe();
  }
}
