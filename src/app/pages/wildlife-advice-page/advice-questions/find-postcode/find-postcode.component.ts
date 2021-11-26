import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import axios from 'axios';
import { LocationAnswers } from '../../services/location-answer.service';
import { osApiEnvironment } from './os-api-env';

@Component({
  selector: 'app-find-postcode',
  templateUrl: './find-postcode.component.html',
  styleUrls: ['./find-postcode.component.scss']
})

export class FindPostcodeComponent implements OnInit {

  constructor(public locationAnswersService: LocationAnswers) { }

  ngOnInit(): void {
  }

  public postcodeFormControl: FormControl = new FormControl('', [Validators.required]);

  // //This reads the resonse when we click enter- this is not consistent with our save button approach!!
  // public onTextChange(){
  //   if(this.postcodeFormControl.value == ""){
  //     //If response is empty, create 'postcode required' err
  //     document.getElementById('errMessage')!.innerHTML = "Postcode required.";
  //     return;
  //   }
  //   //search the ordnance survey databas to find information about the opstcode submitted
  //   //limiting the response to 1 so we only get exact results
  //   axios.get('https://api.os.uk/search/names/v1/find?maxresults=1&query=' + this.postcodeFormControl.value + '&key=' + osApiEnvironment.OS_API_KEY)
  //   .then( (response) => {
  //       if(response.data.results[0].GAZETTEER_ENTRY.ID.toUpperCase() === this.postcodeFormControl.value.toUpperCase()){
  //         document.getElementById('errMessage')!.innerHTML = "";
  //         //A response is composed of the results from mutliple tick boxes!
  //         console.log(response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_X + " - " + response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_Y);
  //         this.locationAnswersService.addAnswerSet(response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_X, response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_Y);
  //       }
  //       else{
  //         //If is in a valid postcode format but the address cannot be found, throw unfound postcode err
  //         document.getElementById('errMessage')!.innerHTML = "Cannot find your postcode.";
  //       }
  //   })
  //   //********** Try using error codes to finesse this response **********
  //   .catch(error => {
  //     //If the API throws an err because entry is not a valid postcode format, throw invalid postcode err
  //     document.getElementById('errMessage')!.innerHTML = "Invalid postcode.";
  //   });
  // }

  async saveForm(){
    if(this.postcodeFormControl.value == ""){
      //If response is empty, create 'postcode required' err
      document.getElementById('errMessageForm')!.innerHTML = "Postcode required.";
      return;
    }
    //search the ordnance survey databas to find information about the opstcode submitted
    //limiting the response to 1 so we only get exact results
    axios.get('https://api.os.uk/search/names/v1/find?maxresults=1&query=' + this.postcodeFormControl.value + '&key=' + osApiEnvironment.OS_API_KEY)
    .then( (response) => {
        //******* THIS ONLY WORKS WITH NO SPACE IN POSTCODE
        if(response.data.results[0].GAZETTEER_ENTRY.ID.toUpperCase() === this.postcodeFormControl.value.toUpperCase()){
          document.getElementById('errMessageForm')!.innerHTML = "";
          //A response is composed of the results from mutliple tick boxes!
          console.log(response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_X + " - " + response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_Y);
          this.locationAnswersService.addAnswerSet(response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_X, response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_Y);
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

    // if(this.chosenSoilType == "" || this.chosenPHType == "" || this.chosenShadeType == "" || this.chosenSize == ""){
    //   //If unsuccessful, set error message, do not send data
    //   document.getElementById('errMessage')!.innerHTML = "Please answer all questions to get your result!";
    //   return;
    // }
    // else{
    //   //If successful, clear error message
    //   document.getElementById("errMessage")!.innerHTML = "";
    //   //A response is composed of the results from mutliple tick boxes!
    //   this.wildlifeAnswersService.addAnswerSet(this.chosenSoilType, this.chosenPHType, this.chosenShadeType, this.chosenSize);
    // }
  }

  //displays differently if postcode automatically found
  //find hardiness, BNG and local area houses and pass that all to multichoice answers service
  //the results page will turn the location data into a radius and save info to that radius
}
