import { Component, OnInit } from '@angular/core';
import { UnfinishedPollinatorData } from '../../models/pollinator-data.model'; 
import { HttpClient } from '@angular/common/http';
import { WildlifeResponse } from '../../services/pollinator-suggestions.service';
import { Subscription } from 'rxjs';
import { GridResponse } from '../../models/pollinator-visible.model';
import { MatDialog } from '@angular/material/dialog';
import { PollinatorDialogComponent } from '../pollinator-dialog/pollinator-dialog.component';

@Component({
  selector: 'app-pollinator-suggestions',
  templateUrl: './pollinator-suggestions.component.html',
  styleUrls: ['./pollinator-suggestions.component.scss']
})
export class PollinatorSuggestionsComponent implements OnInit {

  //Subscriptions to wildlife answers data
  private monthsSub: Subscription = new Subscription;

  public displayFlowers: GridResponse[][] = [];

  constructor(private httpClient: HttpClient, public wildlifeResponseService: WildlifeResponse, public dialog: MatDialog) {
    // here we are subscribing to the listener
    this.monthsSub = this.wildlifeResponseService.getMonthsUsedListener().subscribe((retrievedAnswers: GridResponse[][]) => {
      //select the flowers that will be displayed
      this.selectMain(retrievedAnswers);
    },
    err => {
      console.error(err);
    });
  }

  //selects the 'main' plants that will be on the initial grid display
  private selectMain(retrievedAnswers: GridResponse[][]){
    //iterate for each month
    for(var i = 0; i < retrievedAnswers.length; i++){
      var ourMonthDisplay : GridResponse[] = [];
      //Five flowers are chosen- an appropriate amount to display
      for(var j = 0; j < 5; j++){
        var rand = Math.floor( Math.random() * retrievedAnswers[i].length);
        ourMonthDisplay[j] = retrievedAnswers[i][rand];
      }
      this.displayFlowers[i] = ourMonthDisplay;
    }
  }

  //this function is passed the correct month data through the HTML
  private openDialog(thisMonthData: GridResponse) {
    const dialogRef = this.dialog.open(PollinatorDialogComponent, {
      height: '480px',
      width: '750px',
      data: thisMonthData,
    });
  }
  
  ngOnInit() {}

  //This is called whenever this component is about to be removed from the DOM
  ngOnDestroy(){
    //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
    this.monthsSub.unsubscribe();
  }
}