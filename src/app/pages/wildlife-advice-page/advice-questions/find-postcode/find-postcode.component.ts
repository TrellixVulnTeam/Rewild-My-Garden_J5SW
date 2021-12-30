import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { BasicLocationData } from '../../models/location-data.model';
import { LocationAnswers } from '../../services/location-answer.service';
import { osApiEnvironment } from './os-api-env';

@Component({
  selector: 'app-find-postcode',
  templateUrl: './find-postcode.component.html',
  styleUrls: ['./find-postcode.component.scss']
})

export class FindPostcodeComponent implements OnInit {

  @Output() nextQuestion = new EventEmitter();
  private getLocSub: Subscription = new Subscription();

  constructor(public locationAnswersService: LocationAnswers) { }

  ngOnInit(): void {
  }

  public postcodeFormControl: FormControl = new FormControl('', [Validators.required]);

  async saveForm(){
    //This is in case someone enters a postcode then decides to enter another postcode- to make sure the page is reset
    document.getElementById('doneLoading')!.innerHTML = "";
    document.getElementById('nextButton')!.classList.add('hiddenElem');
    document.getElementById('loading')!.classList.add('hiddenElem');

    if(this.postcodeFormControl.value == ""){
      //If response is empty, create 'postcode required' err
      document.getElementById('errMessageForm')!.innerHTML = "Postcode required.";
      return;
    }
    //search the ordnance survey databas to find information about the opstcode submitted
    //limiting the response to 1 so we only get exact results
    axios.get('https://api.os.uk/search/names/v1/find?maxresults=1&query=' + this.postcodeFormControl.value + '&key=' + osApiEnvironment.OS_API_KEY)
    .then( (response) => {
        if(response.data.results[0].GAZETTEER_ENTRY.ID.toUpperCase() === this.postcodeFormControl.value.replace(/\s/g, "").toUpperCase()){
          document.getElementById('errMessageForm')!.innerHTML = "";
          this.locationAnswersService.addAnswerSet(response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_X, response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_Y);
          //Show loading message
          document.getElementById('loading')!.classList.remove('hiddenElem');
          //call the location answer service so we know when it is done loading
          this.getLocSub = this.locationAnswersService.getAnswerUpdateListener().subscribe((retrievedLocation: BasicLocationData) => {
            //If we have found hardiness, hide loading form,  show hardiness, show next button
            document.getElementById('loading')!.classList.add('hiddenElem');
            document.getElementById('doneLoading')!.innerHTML = "Your hardiness zone is " + retrievedLocation.hardiness + ".";
            document.getElementById('nextButton')!.classList.remove('hiddenElem');
          });
        }
        else{
          //If is in a valid postcode format but the address cannot be found, throw unfound postcode err
          document.getElementById('errMessageForm')!.innerHTML = "Cannot find your postcode.";
        }
    })
    //********** Try using error codes to finesse this response **********
    .catch(error => {
      //If the API throws an err because entry is not a valid postcode format, throw invalid postcode err
      document.getElementById('errMessageForm')!.innerHTML = "Invalid postcode.";
    });
  }

  public getNextQuestion(){
    //Notify that we are ready to see the next question
    this.nextQuestion.emit();
  }

  //This is called whenever this component is about to be removed from the DOM
  @HostListener('unloaded')
  ngOnDestroy() {
      //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
      this.getLocSub.unsubscribe();
  }

  //displays differently if postcode automatically found
  //find hardiness, BNG and local area houses and pass that all to multichoice answers service
  //the results page will turn the location data into a radius and save info to that radius
}
