import { HostListener, Injectable } from "@angular/core";
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
  private pollinatorSub: Subscription = new Subscription();

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
      },
      err => {
        console.log(err);
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
      this.pollinatorSub = this.httpClient.get<UnfinishedPollinatorData[]>(REST_API_SERVER).subscribe(
        response => {
        let allDataThisMonth: UnfinishedPollinatorData[] = response;
        this.allMonthsUsed[this.counter] = this.populateMonth(allDataThisMonth, this.infoArr[this.counter].Title);
        //Using recursion to loop through all 8 months
        if(this.counter == 7){
          this.createSubObjects();
          return;
        }
        else{
          this.counter++;
          this.getGridData();
        }
      },
      err => {
        console.log(err);
      });
  }

  private populateMonth(allDataThisMonth: UnfinishedPollinatorData[], monthTitle: String) : GridResponse[]{
    //Create a new month array for new cell of allMonthsUsed (i.e, create data array for the new month)
    const monthData: GridResponse[] = [];
    //Every plant we can find associated with this month is added to this month's array
    for (let j = 0; j < allDataThisMonth.length; j++) {
      //Creating a new blank grid response
      //This is done in a quirky way because I had a battle to get it to work
      //It might be worth trying to reimplement this if there is time *************************
      monthData[j] = {"Title": monthTitle, 
      "LatinName": allDataThisMonth[j].LatinName, 
      "CommonName": allDataThisMonth[j].CommonName, 
      "Hardiness": this.getHardinessString(allDataThisMonth[j]),
      "Soil": this.getSoilString(allDataThisMonth[j]),
      "SoilPH": this.getPHString(allDataThisMonth[j]),
      "Shadiness": this.getShadinessString(allDataThisMonth[j]),
      "Moisture": this.getMoistureString(allDataThisMonth[j]),
      "Habit": allDataThisMonth[j].Habit, 
      "Height": allDataThisMonth[j].Height, 
      "Growth": allDataThisMonth[j].Growth, 
      "Native": this.getNativeString(allDataThisMonth[j].Native), 
      "Pathname": allDataThisMonth[j].Pathname, 
      "Name": allDataThisMonth[j].Name, 
      "Username": allDataThisMonth[j].Username, 
      "Copyright": allDataThisMonth[j].Copyright, 
      "Link": allDataThisMonth[j].Link};
    }
    return monthData;
  }

  private getHardinessString(allDataThisMonth: UnfinishedPollinatorData){
    if(allDataThisMonth.Hardiness0 == "Y"){
      return "0 and above"
    }
    if(allDataThisMonth.Hardiness1 == "Y"){
      return "1 and above"
    }
    if(allDataThisMonth.Hardiness2 == "Y"){
      return "2 and above"
    }
    if(allDataThisMonth.Hardiness3 == "Y"){
      return "3 and above"
    }
    if(allDataThisMonth.Hardiness4 == "Y"){
      return "4 and above"
    }
    if(allDataThisMonth.Hardiness5 == "Y"){
      return "5 and above"
    }
    if(allDataThisMonth.Hardiness6 == "Y"){
      return "6 and above"
    }
    if(allDataThisMonth.Hardiness7 == "Y"){
      return "7 and above"
    }
    if(allDataThisMonth.Hardiness8 == "Y"){
      return "8 and above"
    }
    if(allDataThisMonth.Hardiness9 == "Y"){
      return "9 and above"
    }
    if(allDataThisMonth.Hardiness10 == "Y"){
      return "10 and above"
    }
    if(allDataThisMonth.Hardiness11 == "Y"){
      return "11 and above"
    }
    if(allDataThisMonth.Hardiness12 == "Y"){
      return "12 and above"
    }
    return "Unknown"
  }

  private getSoilString(allDataThisMonth: UnfinishedPollinatorData){
    let responseString: String = "";
    if(allDataThisMonth.SoilLight == "Y"){
      responseString = responseString + "Light Soil"
    }
    if(allDataThisMonth.SoilMedium == "Y"){
      if(responseString == ""){
        responseString = responseString + "Medium Soil"
      }
      else{
        responseString = responseString + ", Medium Soil"
      }
    }
    if(allDataThisMonth.SoilHeavy == "Y"){
      if(responseString == ""){
        responseString = responseString + "Heavy Clay Soil"
      }
      else{
        responseString = responseString + ", Heavy Clay Soil"
      }
    }
    return responseString;
  }

  private getPHString(allDataThisMonth: UnfinishedPollinatorData): String{
    let responseString: String = "";
    if(allDataThisMonth.PHBasicAlkaline == "Y"){
      responseString = responseString + "Basic (Alkaline) Soil"
    }
    if(allDataThisMonth.PHNeutral == "Y"){
      if(responseString == ""){
        responseString = responseString + "Neutral Soil"
      }
      else{
        responseString = responseString + ", Neutral Soil"
      }
    }
    if(allDataThisMonth.PHAcid == "Y"){
      if(responseString == ""){
        responseString = responseString + "Acid Soil"
      }
      else{
        responseString = responseString + ", Acid Soil"
      }
    }
    return responseString;
  }

  private getShadinessString(allDataThisMonth: UnfinishedPollinatorData){
    let responseString: String = "";
    if(allDataThisMonth.ShadeNone == "Y"){
      responseString = responseString + "No Shade"
    }
    if(allDataThisMonth.ShadeSemi == "Y"){
      if(responseString == ""){
        responseString = responseString + "Medium Shade"
      }
      else{
        responseString = responseString + ", Medium Shade"
      }
    }
    if(allDataThisMonth.ShadeFull == "Y"){
      if(responseString == ""){
        responseString = responseString + "Full Shade"
      }
      else{
        responseString = responseString + ", Full Shade"
      }
    }
    return responseString;
  }

  private getMoistureString(allDataThisMonth: UnfinishedPollinatorData){
    let responseString: String = "";
    if(allDataThisMonth.MoistureDry == "Y"){
      responseString = responseString + "Dry Soil"
    }
    if(allDataThisMonth.MoistureMoist == "Y"){
      if(responseString == ""){
        responseString = responseString + "Moist Soil"
      }
      else{
        responseString = responseString + ", Moist Soil"
      }
    }
    if(allDataThisMonth.MoistureWet == "Y"){
      if(responseString == ""){
        responseString = responseString + "Wet Soil"
      }
      else{
        responseString = responseString + ", Wet Soil"
      }
    }
    if(allDataThisMonth.MoistureWater == "Y"){
      if(responseString == ""){
        responseString = responseString + "Water"
      }
      else{
        responseString = responseString + ", Water"
      }
    }
    return responseString;
  }

  private getNativeString(nativeLetter: String): String {
    if(nativeLetter == "Y"){
      return "Yes";
    } else{
      return "No";
    }
  }

  private getAPI(monthReq: String) {
    // Responses are all always set to "Y" because we're never testing for something NOT appropriate for a garden (in the the context of what our site does)
    // Because we are cycling through floweringType queries, it is a local variable not a global one
    return (
      "https://rewildmygarden-api.azurewebsites.net/api/minimalTestDataFilter?" +
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
    //We are now sending our ACTUAL array as opposed to a copy. We do nothing to the data at the other end, so this shouldn't
    //be a problem, but it's a good idea to take note of this ! Creating a duplicate of a multidimensional array would require an
    //explicit copy of each cell
    this.updatedMonthsUsed.next(this.allMonthsUsed);
  }

  ngOnInit() {}

  @HostListener('unloaded')
  ngOnDestroy() {
    //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
    this.answersSub.unsubscribe();
    this.pollinatorSub.unsubscribe();
  }
}
