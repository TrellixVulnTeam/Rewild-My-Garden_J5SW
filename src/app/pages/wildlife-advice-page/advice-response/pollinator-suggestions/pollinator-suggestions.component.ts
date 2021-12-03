import { Component, HostListener, OnInit } from '@angular/core';
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

  constructor(public wildlifeResponseService: WildlifeResponse, public dialog: MatDialog) {
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
    for(let i = 0; i < retrievedAnswers.length; i++){
      const ourMonthDisplay: GridResponse[] = [];
      let recursiveBackstop = 0;
      this.chooseRandomFirst(i, recursiveBackstop, retrievedAnswers, ourMonthDisplay);
      //Next four flowers are chosen- an appropriate amount to display
      for(let j = 1; j < 5; j++){
        const rand = Math.floor(Math.random() * retrievedAnswers[i].length);
        //create an array for just this month
        ourMonthDisplay[j] = retrievedAnswers[i][rand];
      }
      //add the month array to an array which holds all months
      this.displayFlowers[i] = ourMonthDisplay;
    }
  }

  private chooseRandomFirst(i: number, recursiveBackstop: number, retrievedAnswers: GridResponse[][], ourMonthDisplay: GridResponse[]){
      //Find the first flower- the one that will be displayed on our main grid
      let flag = "set";
      //Get a random cell index from the retrieved answers grid
      const rand = Math.floor(Math.random() * retrievedAnswers[i].length);
      //Set a response corresponding to this random index choice
      let tempDisplay: GridResponse = retrievedAnswers[i][rand];
      //Look at the cell that has been chosen for display in our previous months
      for(let k = 0; k < i; k++){
        //If we find that the choice we've made is one that has been made in a previous month, this will not
        //be our final choice
        if(this.displayFlowers[k][0].LatinName == tempDisplay.LatinName){
          flag="dontSet"
        }
      }
      if(flag=="set"){
        console.log("chosen: " + tempDisplay.LatinName);
        //Set this choice as our final answer
        ourMonthDisplay[0] = tempDisplay;
      }
      //if flag!="set" it must equal "dontSet"
      else{
        console.log("not chosen: " + tempDisplay.LatinName);
        if(recursiveBackstop == 5){
          ourMonthDisplay[0] = tempDisplay;
        }
        else{
          //The recursiveBackstop is our getout clause. If we search recursively for a non-repeating
          //flower 5 times without finding one we can assume that there are not enough plants available
          //to not feature a repeat, and so we just let a repeat happen. This is so we do not end up in an infinite loop.
          console.log("recursive backstop: " + recursiveBackstop);
          recursiveBackstop++;
          //call the function recursively until we find an appropriate choice
          this.chooseRandomFirst(i, recursiveBackstop, retrievedAnswers, ourMonthDisplay);
        }
      }
  }

  //this function is passed the correct month data through the HTML
  openDialog(thisMonthData: GridResponse) {
    const dialogRef = this.dialog.open(PollinatorDialogComponent, {
      height: '480px',
      width: '750px',
      data: thisMonthData,
    });
  }
  
  ngOnInit() {}

  //This is called whenever this component is about to be removed from the DOM
  @HostListener('unloaded')
  ngOnDestroy(){
    //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
    this.monthsSub.unsubscribe();
  }
}