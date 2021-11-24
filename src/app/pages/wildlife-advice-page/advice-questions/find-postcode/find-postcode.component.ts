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

  public postcodeFormControl: FormControl = new FormControl('', [Validators.required, this.isPostcode.bind(this)]);
  public matcher = new MyErrorStateMatcher();

  //This reads the resonse when we click enter- this is not consistent with our save button approach!!
  public onTextChange(){
    //search the ordnance survey databas to find information about the opstcode submitted
    //limiting the response to 1 so we only get exact results
    axios.get('https://api.os.uk/search/names/v1/find?maxresults=1&query=' + this.postcodeFormControl.value + '&key=' + osApiEnvironment.OS_API_KEY)
    //this was originally ".then(function (response)" - converted due to a problem with the type of this.postcodeFormControl.value
    .then( (response) => {
        if(response.data.results[0].GAZETTEER_ENTRY.ID.toUpperCase() === this.postcodeFormControl.value.toUpperCase()){
          console.log(JSON.stringify("hello" + response.data.results[0].GAZETTEER_ENTRY.ID, null, 2));
          console.log(JSON.stringify("hello" + response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_X, null, 2));
          console.log(JSON.stringify("hello" + response.data.results[0].GAZETTEER_ENTRY.GEOMETRY_Y, null, 2));
        }
        else{
          this.postcodeFormControl.hasError('postcode');
          console.log('Postcode not found.');
          //the postcode is not valid! prompt again
        }
    })
    //Try using error codes to finesse this response
    .catch(error => {
      this.postcodeFormControl.hasError('postcode');
      console.log('Err.');
    });
  }
  //displays differently if postcode automatically found
  //find hardiness, BNG and local area houses and pass that all to multichoice answers service
  //the results page will turn the location data into a radius and save info to that radius

  private isPostcode(control: AbstractControl): { [key: string]: boolean } | null  {
    //always return false
    return ({"postcode " : false})
  }
}

//from https://material.angular.io/components/input/examples - displays err message for incorrect form input
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
