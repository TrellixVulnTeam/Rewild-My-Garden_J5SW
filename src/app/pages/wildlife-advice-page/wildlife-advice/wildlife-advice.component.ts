import { Component, OnInit } from '@angular/core';
import { UnfinishedPollinatorData } from '../../../unfinishedPollinatorData.model'; 
import { HttpClient } from '@angular/common/http';
import { WildlifeResponse } from '../wildlife-response.service';
import { Subscription } from 'rxjs';
import { GridResponse } from '../grid-response.model';

@Component({
  selector: 'app-wildlife-advice',
  templateUrl: './wildlife-advice.component.html',
  styleUrls: ['./wildlife-advice.component.scss']
})
export class WildlifeAdviceComponent implements OnInit {

  //Subscriptions to wildlife answers data
  private monthsSub: Subscription = new Subscription;
  public monthsData: GridResponse[] = [];

  constructor(private httpClient: HttpClient, public wildlifeResponseService: WildlifeResponse) {
    // here we are subscribing to the listener
    this.monthsSub = this.wildlifeResponseService.getMonthsUsedListener().subscribe((retrievedAnswers: GridResponse[]) => {
      this.monthsData = retrievedAnswers;
    });
  }
  
  ngOnInit() {}

  //This is called whenever this component is about to be removed from the DOM
  ngOnDestroy(){
    //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
    this.monthsSub.unsubscribe();
  }
}