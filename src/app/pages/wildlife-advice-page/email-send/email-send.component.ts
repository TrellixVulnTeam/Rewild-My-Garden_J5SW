import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { ProximityEnvironment } from '../advice-response/proximity-env';
import { AdviceSave } from '../models/save-advice.model';
import { UserDataSave } from '../models/save-user-data.model';

@Component({
  selector: 'app-email-send',
  templateUrl: './email-send.component.html',
  styleUrls: ['./email-send.component.scss']
})
export class EmailSendComponent implements OnInit {

  //the email that the user has submitted
  private email: String = "";
  public localUpdates: String = "";
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  private extraSub: Subscription = new Subscription();
  private userSub: Subscription = new Subscription();

  @Input() savedAdviceFinal: AdviceSave[] = [];
  @Input() latitudeFinal: Number = 0;
  @Input() longitudeFinal: Number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  public processEmailData(){
    this.email = this.emailFormControl.value;
    this.sendEmail();
    //we are sending updates before we add them to the database- so does not count themselves
    this.sendUpdateEmails();
    this.saveUserData();
  }

  private sendEmail(){
    if(this.savedAdviceFinal.length == 0){
      alert("You haven't saved any advice yet! Please select some advice and then re-enter your email.");
    }
    else{
      const emailContent = { email: this.email, emailBody: this.getEmailContent()};
      axios.post('http://localhost:3000/api/sendmail', emailContent)
      .then(response => {
        alert("An email was sent to " + this.email + ". Happy gardening!");
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
    }
  }

  private getEmailContent(): String{
    let htmlString: String = '<head><link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"></head><body>' + 
        '<p style="text-align: center; font-family:' + "'Playfair Display'" + ', serif; font-size: 30px;">Thank you for using Rewild My Garden!</p>' +
        '<p style="text-align: center; font-size: 20px">Please see the advice you saved below: </p><br>';

    for(let i=0; i<this.savedAdviceFinal.length; i++){
      htmlString = htmlString +"<div>" +
        "<div>" +
          '<p style="font-family:' + "'Playfair Display'" + ', serif; font-size: 20px; line-height: 0.8;">' + this.savedAdviceFinal[i].Header + '</p>' +
          "<p><b>" + this.savedAdviceFinal[i].Justification + "</b></p>" +
          "<p>" + this.savedAdviceFinal[i].BodyText + "</p>" +
        '</div>' +
        '<br>';
    }
    htmlString = htmlString + "</body>"
    return htmlString;
  }

  //Triggered by processEmailData() below
  private saveUserData(){
    //Correct order of coordinates in geojson is [longitude, latitude, elevation] https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.1
    console.log(this.localUpdates);
    const geoJsonObj: UserDataSave = {
      "type": "Feature",
      "properties": {
        "email": this.email,
        "savedAdvice": this.savedAdviceFinal,
        "localUpdates": this.localUpdates,
        //initial state is 'no emails sent'
        "hedgehogSent": "false",
        "pondSent": "false",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          this.longitudeFinal, this.latitudeFinal
        ]
      }
    };
    //************* this line may not need to include a .subscribe()
    //check for err????
    this.extraSub = this.httpClient.post("http://localhost:3000/api/userData", geoJsonObj).subscribe();
  }

  //********** update GDPR statment to say we are saving whether emails have been sent.
  private sendUpdateEmails(){
    this.userSub = this.httpClient.get<UserDataSave[]>("http://localhost:3000/api/userData?Distance=" + ProximityEnvironment.CLOSEST + "&Longitude=" + this.longitudeFinal + "&Latitude=" + this.latitudeFinal).subscribe(
      response => {
        //search for ppl in the area who have asked for updates, and who have not been emailed about hedgehogs before
        //find THEIR radiuses, and see whether anyone near them has put in a hedgehog hole
        //if our original user as put in a hedgehog hole, count as +1, if not, no +1 (the original user is not yet in the db)
        //if >2, then send email
      });
  }

  ngOnDestroy() {
    this.extraSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
