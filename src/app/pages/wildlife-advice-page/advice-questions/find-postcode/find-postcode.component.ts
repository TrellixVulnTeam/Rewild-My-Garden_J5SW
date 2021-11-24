import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-find-postcode',
  templateUrl: './find-postcode.component.html',
  styleUrls: ['./find-postcode.component.scss']
})
export class FindPostcodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  postcodeFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  //This reads the resonse when we click enter- this is not consistent with our save button approach!!
  public onTextChange(){
    console.log(this.postcodeFormControl.value);
  }
  //displays differently if postcode automatically found
  //find hardiness, BNG and local area houses and pass that all to multichoice answers service
  //the results page will turn the location data into a radius and save info to that radius
}

//from https://material.angular.io/components/input/examples - displays err message for incorrect form input
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
