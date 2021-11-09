import { Component, OnInit } from '@angular/core';
import { UnfinishedPollinatorData } from '../../../unfinishedPollinatorData.model'; 
import { HttpClient } from '@angular/common/http';
import { WildlifeResponse } from '../wildlife-response.service';
import { Subscription } from 'rxjs';
import { GridResponse } from '../grid-response.model';
import { WildlifeAdviceDialogComponent } from '../wildlife-advice-dialog/wildlife-advice-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wildlife-advice',
  templateUrl: './wildlife-advice.component.html',
  styleUrls: ['./wildlife-advice.component.scss']
})
export class WildlifeAdviceComponent implements OnInit {

  //Subscriptions to wildlife answers data
  private monthsSub: Subscription = new Subscription;
  //Response object that will be displayed in our html
  public marchGridResponse: GridResponse =  {Title: "March", Month: "FloweringMarch", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public aprilGridResponse: GridResponse =  {Title: "April", Month: "FloweringApril", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public mayGridResponse: GridResponse =  {Title: "May", Month: "FloweringMay", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public juneGridResponse: GridResponse =  {Title: "June", Month: "FloweringJune", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public julyGridResponse: GridResponse =  {Title: "July", Month: "FloweringJuly", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public augustGridResponse: GridResponse =  {Title: "August", Month: "FloweringAugust", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public septGridResponse: GridResponse =  {Title: "September", Month: "FloweringSept", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public octGridResponse: GridResponse =  {Title: "October", Month: "FloweringOct", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};
  public novGridResponse: GridResponse =  {Title: "November", Month: "FloweringNov", "LatinName": "", "CommonName": "", "Habit": "", "Height": "", "Growth": "", "Native": "", "Pathname": "", "Name": "", "Username": "", "Copyright": "", "Link": ""};

  constructor(private httpClient: HttpClient, public wildlifeResponseService: WildlifeResponse, public dialog: MatDialog) {
    // here we are subscribing to the listener
    this.monthsSub = this.wildlifeResponseService.getMonthsUsedListener().subscribe((retrievedAnswers: GridResponse[]) => {
      this.marchGridResponse = retrievedAnswers[0];
      this.aprilGridResponse = retrievedAnswers[1];
      this.mayGridResponse = retrievedAnswers[2];
      this.juneGridResponse = retrievedAnswers[3];
      this.julyGridResponse = retrievedAnswers[4];
      this.augustGridResponse = retrievedAnswers[5];
      this.septGridResponse = retrievedAnswers[6];
      this.octGridResponse = retrievedAnswers[7];
      this.novGridResponse = retrievedAnswers[8];
    });
  }

  //this function is passed the correct month data through the HTML
  openDialog(thisMonthData: GridResponse) {
    const dialogRef = this.dialog.open(WildlifeAdviceDialogComponent, {
      height: '340px',
      width: '750px',
      data: thisMonthData,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  ngOnInit() {}

  //This is called whenever this component is about to be removed from the DOM
  ngOnDestroy(){
    //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
    this.monthsSub.unsubscribe();
  }
}