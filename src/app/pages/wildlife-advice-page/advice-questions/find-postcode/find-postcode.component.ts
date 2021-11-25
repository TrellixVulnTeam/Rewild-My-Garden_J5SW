import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import axios from 'axios';
import { osApiEnvironment } from './os-api-env';

@Component({
  selector: 'app-find-postcode',
  templateUrl: './find-postcode.component.html',
  styleUrls: ['./find-postcode.component.scss']
})

export class FindPostcodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public postcodeFormControl: FormControl = new FormControl('', [Validators.required]);

  //This reads the resonse when we click enter- this is not consistent with our save button approach!!
  public onTextChange(){
    if(this.postcodeFormControl.value == ""){
      //If response is empty, create 'postcode required' err
      document.getElementById('errMessage')!.innerHTML = "Postcode required.";
      return;
    }
    //search the ordnance survey databas to find information about the opstcode submitted
    //limiting the response to 1 so we only get exact results
    axios.get('https://api.os.uk/search/names/v1/find?maxresults=1&query=' + this.postcodeFormControl.value + '&key=' + osApiEnvironment.OS_API_KEY)
    .then( (response) => {
        if(response.data.results[0].GAZETTEER_ENTRY.ID.toUpperCase() === this.postcodeFormControl.value.toUpperCase()){
          document.getElementById('errMessage')!.innerHTML = "";
          console.log(JSON.stringify("hello" + response.data.results[0].GAZETTEER_ENTRY.ID, null, 2));
          console.log(JSON.stringify("hello" + response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_X, null, 2));
          console.log(JSON.stringify("hello" + response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_Y, null, 2));
        }
        else{
          //If is in a valid postcode format but the address cannot be found, throw unfound postcode err
          document.getElementById('errMessage')!.innerHTML = "Cannot find your postcode.";
        }
    })
    //********** Try using error codes to finesse this response **********
    .catch(error => {
      //If the API throws an err because entry is not a valid postcode format, throw invalid postcode err
      document.getElementById('errMessage')!.innerHTML = "Invalid postcode.";
    });
  }
  //displays differently if postcode automatically found
  //find hardiness, BNG and local area houses and pass that all to multichoice answers service
  //the results page will turn the location data into a radius and save info to that radius
}
