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
  public ourMonths: GridResponse[] = [];

  constructor(private httpClient: HttpClient, public wildlifeResponseService: WildlifeResponse, public dialog: MatDialog) {
    // here we are subscribing to the listener
    this.monthsSub = this.wildlifeResponseService.getMonthsUsedListener().subscribe((retrievedAnswers: GridResponse[]) => {
      this.ourMonths = retrievedAnswers;
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