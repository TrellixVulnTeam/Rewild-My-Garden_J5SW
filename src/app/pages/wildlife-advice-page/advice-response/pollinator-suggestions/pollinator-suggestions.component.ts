import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { WildlifeResponse } from '../../services/pollinator-suggestions.service';
import { Subscription } from 'rxjs';
import { GridResponse } from '../../models/pollinator-visible.model';
import { MatDialog } from '@angular/material/dialog';
import { PollinatorDialogComponent } from '../pollinator-dialog/pollinator-dialog.component';
import { AdviceSave } from '../../models/save-advice.model';

@Component({
  selector: 'app-pollinator-suggestions',
  templateUrl: './pollinator-suggestions.component.html',
  styleUrls: ['./pollinator-suggestions.component.scss']
})
export class PollinatorSuggestionsComponent implements OnInit {

    /*********************************************************************
   ***********************************************************************
   **************** MAIN LOGIC TO CHOOSE AND LOAD PLANTS *****************
   ***********************************************************************
   ***********************************************************************/

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
      //Choose first flower in the array- this is the one that will be displayed on the main page
      this.chooseRandomFirst(i, recursiveBackstop, retrievedAnswers, ourMonthDisplay);
      
      //Next four flowers are chosen- these will be displayed in the pop up
      if(retrievedAnswers[i].length < 8){
        //If there is 7 or fewer flowers to choose from, just choose the first 4 to be displayed in the pop-up
        //If there are fewer than 5, (j < retrievedAnswers[i].length) assures we won't try and access an array cell that doesn't exist.
        //'displayCount = 1' here is to accommodate for the fact that we don't want to overwrite ourMonthDisplay[0] because it
        //holds our main display plant
        let displayCount: number = 1;
        for(let j = 0; (j < 4) && (j < retrievedAnswers[i].length); j++){
          //If the most recent retrieved plant != the plant we're displaying in the main grid, set it and iterate our count
          if(retrievedAnswers[i][j].LatinName != ourMonthDisplay[0].LatinName){
            ourMonthDisplay[displayCount] = retrievedAnswers[i][j];
            displayCount++;
          } 
          //If retrievedAnswers[i][j].LatinName == ourMonthDisplay[0].LatinName 
            // - Do not iterate displayCount
            // - Do not set anything to ourMonthDisplay
          //By using displayCount we can skip a cell in retrievedAnswers without leaving a corresponding gap in our
          //ourMonthDisplay array (as would be the case if we did ourMonthDisplay[j] = retrievedAnswers[i][j] and tried to skip
        }
      }
      else{
        for(let p = 1; p < 5; p++){
          let recursiveBackstopLoop = 0;
          this.chooseRandomForPopUp(i, p, recursiveBackstopLoop, retrievedAnswers, ourMonthDisplay)
        }
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
        //Set this choice as our final answer
        ourMonthDisplay[0] = tempDisplay;
      }
      //if flag!="set" it must equal "dontSet"
      else{
        if(recursiveBackstop == 5){
          ourMonthDisplay[0] = tempDisplay;
        }
        else{
          //The recursiveBackstop is our getout clause. If we search recursively for a non-repeating
          //flower 5 times without finding one we can assume that there are not enough plants available
          //to not feature a repeat, and so we just let a repeat happen. This is so we do not end up in an infinite loop.
          recursiveBackstop++;
          //call the function recursively until we find an appropriate choice
          this.chooseRandomFirst(i, recursiveBackstop, retrievedAnswers, ourMonthDisplay);
        }
      }
  }

  private chooseRandomForPopUp(i: number, p: number, recursiveBackstop: number, retrievedAnswers: GridResponse[][], ourMonthDisplay: GridResponse[]){
    //Find the first flower- the one that will be displayed on our main grid
    let flag = "set";
    //Get a random cell index from the retrieved answers grid
    const rand = Math.floor(Math.random() * retrievedAnswers[i].length);
    //Set a response corresponding to this random index choice
    let tempDisplay: GridResponse = retrievedAnswers[i][rand];
    //Look at the previous plants chosen for this pop up
    for(let k = 0; k < ourMonthDisplay.length; k++){
      //If we find that the choice we've made is one that has been made in the popup already, this will not
      //be our final choice
      if(ourMonthDisplay[k].LatinName == tempDisplay.LatinName){
        flag="dontSet"
      }
    }
    if(flag=="set"){
      //Set this choice as our final answer
      ourMonthDisplay[p] = tempDisplay;
    }
    //if flag!="set" it must equal "dontSet"
    else{
      if(recursiveBackstop == 5){
        ourMonthDisplay[p] = tempDisplay;
      }
      else{
        //The recursiveBackstop is our getout clause. If we search recursively for a non-repeating
        //flower 5 times without finding one we just let a repeat happen. 
        //This is to help prioritise speed over avoiding repetition.
        //For this function it is possibly overkill, but can't hurt.
        recursiveBackstop++;
        //call the function recursively until we find an appropriate choice
        this.chooseRandomForPopUp(i, p, recursiveBackstop, retrievedAnswers, ourMonthDisplay);
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

  /***********************************************************************
  ***********************************************************************
  ************************ LOGIC TO SAVE TO EMAIL ***********************
  ***********************************************************************
  ***********************************************************************/

  //Code used to output when someone wants to save a piece of advice
  private isChecked : boolean = false;

  @Output() newSaveEvent = new EventEmitter();
  @Output() newRemoveEvent = new EventEmitter();

  // make changes to the array in wildlifeLayout
  toggleSave(){
    if(!this.isChecked){
      this.addNewSave();
      this.isChecked = true;
    } 
    else{
      this.removeSave();
      this.isChecked = false;
    }
  }

  private removeSave(){
    this.newRemoveEvent.emit("Make your Garden Flower from Spring until Autumn");
  }

  private addNewSave() {
    const saveObj: AdviceSave =
        {
          Header: "Make your Garden Flower from Spring until Autumn",
          Pathname: "/assets/plant_images/Colchicum_autumnale.jpeg",
          Justification: "It is helpful to have plants flowering in your garden from spring to autumn. Each plant blooms in the month specified and suits your garden, so you can make your garden a home to pollinators all year.",
          BodyText: "These were the plants that were recommended for you:<br>" + this.getRecommendedPlantsHTML(),
          Name: "Colchicum autumnale",
          Username: "Stemonitis",
          Copyright: "Public Domain",
          Link: "https://commons.m.wikimedia.org/wiki/File:Colchicum_autumnale.jpg?fbclid=IwAR3znOBrPSSkVfPTMvITNoOQE-1OnQVI2DuhTYuC6IB0apVSwcRDpAte6NU"
        };

    this.newSaveEvent.emit(saveObj);
  }

  private getRecommendedPlantsHTML() : String{
    let ourString = "";
    for(let i = 0; i < this.displayFlowers.length; i++){
      ourString = ourString + "<b>" + this.displayFlowers[i][0].Title + "</b><br>";
      for(let j = 0; j < this.displayFlowers[i].length; j++){
        ourString = ourString + this.displayFlowers[i][j].LatinName;
        //If there are common names to list, add them between brackets
        if(this.displayFlowers[i][j].CommonName != "" && this.displayFlowers[i][j].CommonName != " "){
          ourString = ourString + " (" + this.displayFlowers[i][j].CommonName + ")<br>";
        }
        //If there are none, just add to list
        else{
          ourString = ourString + "<br>";
        }
      }
    }
    return ourString;
  }
}