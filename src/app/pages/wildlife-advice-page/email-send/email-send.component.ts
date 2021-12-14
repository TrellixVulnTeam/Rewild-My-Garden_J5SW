import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import axios from 'axios';
import { Observable, Subscription } from 'rxjs';
import { ProximityEnvironment } from '../advice-response/proximity-env';
import { AdviceSave } from '../models/save-advice.model';
import { UserDataSave } from '../models/save-user-data.model';
import { map } from 'rxjs/operators';


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
  private hedgehogUserSub: Subscription = new Subscription(); 
  private pondUserSub: Subscription = new Subscription(); 
  private updateSub: Subscription = new Subscription(); 
  private updateSubPond: Subscription = new Subscription();

  @Input() savedAdviceFinal: AdviceSave[] = [];
  @Input() latitudeFinal: Number = 0;
  @Input() longitudeFinal: Number = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

    /********************************************************************
   **********************************************************************
   ******************************* INIT LOGIC ***************************
   **********************************************************************
   ***********************************************************************/

  public processEmailData(){
    this.email = this.emailFormControl.value;
    if(this.savedAdviceFinal.length == 0){
      alert("You haven't saved any advice yet! Please select some advice and then re-enter your email.");
    }
    else{
      this.sendEmail();
      //we are sending updates before we add them to the database- so does not count themselves
      this.sendHedgehogUpdateEmails();
      this.sendPondUpdateEmails();
      this.saveUserData();
    }
  }

    /********************************************************************
   **********************************************************************
   ******************* SEND ADVICE RESULTS EMAIL ************************
   **********************************************************************
   ***********************************************************************/

  private sendEmail(){
    const emailContent = { email: this.email, emailBody: this.getEmailContent()};
    axios.post('http://localhost:3000/api/sendmail', emailContent)
    .then(response => {
      alert("An email was sent to " + this.email + ". Happy gardening!");
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
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

    /********************************************************************
   **********************************************************************
   *************************** SAVE USER'S DATA *************************
   **********************************************************************
   ***********************************************************************/

  //Triggered by processEmailData() below
  private saveUserData(){
    //Correct order of coordinates in geojson is [longitude, latitude, elevation] https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.1
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

   /********************************************************************
  **********************************************************************
  ******************* SEND LOCAL HEDGEHOG UPDATE EMAILS ****************
  **********************************************************************
  ***********************************************************************/

  //********** update GDPR statment to say we are saving whether emails have been sent.
  private sendHedgehogUpdateEmails(){
    this.userSub = this.httpClient.get<UserDataSave[]>("http://localhost:3000/api/userData?Distance=" + ProximityEnvironment.CLOSEST + "&Longitude=" + this.longitudeFinal + "&Latitude=" + this.latitudeFinal).subscribe(
      response => {
        //search for ppl in the area who have asked for updates, and who have not been emailed about hedgehogs before
        for(let i=0; i<response.length; i++){
          if((response[i].properties.hedgehogSent != "true") && (response[i].properties.localUpdates == "true")){
            //we couldn't return 'true' and 'false' from within a subscription, so we had to make the function itself 
            //observable, and pipe the 'return true', 'return false' information into the observable. This is what 'data'
            //represents here
            this.hedgehogUserSub = this.areThereEnoughHedgehog(response[i]).subscribe(data => {
              if (data == true){
              this.createHedgehogEmail(response[i].properties.email);
              //update the 'hedgehogSent' variable so that each user only recieves one hedgehog email
              this.updateHedgehogSent(response[i].properties.email);
            }
          });
        }
      }
    });
  }

  //***************** ADD ERR TO ALL SUBS
  private areThereEnoughHedgehog(searchUser: UserDataSave): Observable<boolean>{
    //find THEIR radiuses, and see whether anyone near them has put in a hedgehog hole
    return this.httpClient.get<UserDataSave[]>("http://localhost:3000/api/userData?Distance=" + ProximityEnvironment.CLOSEST + "&Longitude=" + searchUser.geometry.coordinates[0] + "&Latitude=" + searchUser.geometry.coordinates[1]).pipe(map(
      response => {
        let hedgehogCount = 0;
        for(let j = 0; j < response.length; j++){
          for(let k = 0; k < response[j].properties.savedAdvice.length; k++){
            if(response[j].properties.savedAdvice[k].Header == "Create a Hedgehog Hole Highway"){
              hedgehogCount++;
            }
          }
        }
        //if our original user as put in a hedgehog hole, count as +1, if not, no +1 (the original user is not yet in the db)
        if(this.didOGUserHedgehog() == true){
          hedgehogCount++;
        }
        //if >=2, then send email
        if(hedgehogCount >= 2){
          return true;
        }
        //if there aren't 2 or more people in this vicinity who have saved hedgehog advice, do not send email
        return false;
      }
    ));
  }

  private didOGUserHedgehog(): boolean{
    for(let p = 0; p < this.savedAdviceFinal.length; p++){
      if(this.savedAdviceFinal[p].Header == "Create a Hedgehog Hole Highway"){
        return true;
      }
    }
    //If "Make a Hedgehog House" is not found in their saved advice, return false
    return false;
  }

  private createHedgehogEmail(ourEmail: String){
    const emailContent = { email: ourEmail, emailBody: this.getHedgehogEmailContent()};
    axios.post('http://localhost:3000/api/sendmail', emailContent)
    .catch(error => {
        console.error('There was an error!', error);
    });
  }

  // a failure of this is if they have filled in the form multiple times for different properties - the
  // email they get won't specify whether we are talking about their garden/allotment etc and they will only get
  // one email per address- after that their email is taken off the 'potential recipients' list **********
  private getHedgehogEmailContent(): String{
    let htmlString: String = '<head><link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"></head><body>' + 
        '<p style="text-align: center; font-family:' + "'Playfair Display'" + ', serif; font-size: 30px;">Update from Rewild My Garden!</p>' +
        '<p style="text-align: center; font-size: 20px">Someone in your area has put in a hedgehog hole.</p>';
    htmlString = htmlString +"<div>" +
      "<div>" +
        '<p> Hedgehogs travel about a mile every night to find food. By making sure your fences have holes in ' + 
        "them, you are more likely to be visited and be part of their night time walks. " + '</p>' +
        "<p>" + "Hedgehogs often get trapped in gardens because fences make it impossible " +
        "for them to roam around. Our data suggests that someone in your " +
        "neighbourhood has put in a hedgehog hole. That means if you do the same " +
        "thing, you could potentially help out your local hedgehogs together! Find out how to make a hole and " + 
        "spread the news to more of your neighbours. Go to www.hedgehogstreet.org for more guidance!" + "</p>" +
        "<p><b>" + "This is a message from Rewild-My-Garden.com. Please email RewildMyGarden@gmail.com if you " + 
        "would like to make sure you don't recieve any more emails from us." + "</b></p>" +
      '</div>' +
      '<br>';
    htmlString = htmlString + "</body>"
    return htmlString;
  }

  /*********************************************************************
  **********************************************************************
  ***** UPDATE DB SO EACH USER ONLY GETS ONE HEDGEHOG UPDATE EMAIL *****
  **********************************************************************
  ***********************************************************************/

  private updateHedgehogSent(ourEmail: String){
    this.updateSub = this.httpClient.put("http://localhost:3000/api/userDataUpdate?" + "Email=" + ourEmail + "&EmailUpdateType=properties.hedgehogSent", "true").subscribe();
    // ************ should .subscribe be here?
  }

     /********************************************************************
  **********************************************************************
  ********************* SEND LOCAL POND UPDATE EMAILS *******************
  **********************************************************************
  ***********************************************************************/

  //Obviously this is a good example of copy and paste code- this need to be changes when/if we have time ! ********
  private sendPondUpdateEmails(){
    this.userSub = this.httpClient.get<UserDataSave[]>("http://localhost:3000/api/userData?Distance=" + ProximityEnvironment.USEFUL_PROXIMITY + "&Longitude=" + this.longitudeFinal + "&Latitude=" + this.latitudeFinal).subscribe(
      response => {
        for(let i=0; i<response.length; i++){
          if((response[i].properties.pondSent != "true") && (response[i].properties.localUpdates == "true")){
            this.pondUserSub = this.areThereEnoughPond(response[i]).subscribe(data => {
              if (data == true){
              this.createPondEmail(response[i].properties.email);
              this.updatePondSent(response[i].properties.email);
            }
          });
        }
      }
    });
  }

  //***************** ADD ERR TO ALL SUBS
  private areThereEnoughPond(searchUser: UserDataSave): Observable<boolean>{
    return this.httpClient.get<UserDataSave[]>("http://localhost:3000/api/userData?Distance=" + ProximityEnvironment.USEFUL_PROXIMITY + "&Longitude=" + searchUser.geometry.coordinates[0] + "&Latitude=" + searchUser.geometry.coordinates[1]).pipe(map(
      response => {
        let pondCount = 0;
        for(let j = 0; j < response.length; j++){
          for(let k = 0; k < response[j].properties.savedAdvice.length; k++){
            if((response[j].properties.savedAdvice[k].Header == "Put in a Small Water Feature") ||
            (response[j].properties.savedAdvice[k].Header == "Create a Container Water Feature") ||
            (response[j].properties.savedAdvice[k].Header == "Put in a Pond")){
              pondCount++;
            }
          }
        }
        if(this.didOGUserPond() == true){
          pondCount++;
        }
        if(pondCount >= 2){
          return true;
        }
        return false;
      }
    ));
  }

  private didOGUserPond(): boolean{
    for(let p = 0; p < this.savedAdviceFinal.length; p++){
      if((this.savedAdviceFinal[p].Header == "Put in a Small Water Feature") ||
            (this.savedAdviceFinal[p].Header == "Create a Container Water Feature") ||
            (this.savedAdviceFinal[p].Header == "Put in a Pond"))
      {
        return true;
      }
    }
    return false;
  }

  private createPondEmail(ourEmail: String){
    const emailContent = { email: ourEmail, emailBody: this.getPondEmailContent()};
    axios.post('http://localhost:3000/api/sendmail', emailContent)
    .catch(error => {
        console.error('There was an error!', error);
    });
  }

  // a failure of this is if they have filled in the form multiple times for different properties - the
  // email they get won't specify whether we are talking about their garden/allotment etc and they will only get
  // one email per address- after that their email is taken off the 'potential recipients' list **********
  private getPondEmailContent(): String{
    let htmlString: String = '<head><link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"></head><body>' + 
        '<p style="text-align: center; font-family:' + "'Playfair Display'" + ', serif; font-size: 30px;">Update from Rewild My Garden!</p>' +
        '<p style="text-align: center; font-size: 20px">Someone in your area has put in a pond.</p>';
    htmlString = htmlString +"<div>" +
      "<div>" + '<p>Put in a pond!' + '</p>'
      '</div>' +
      '<br>';
    htmlString = htmlString + "</body>"
    return htmlString;
  }

  /*********************************************************************
  **********************************************************************
  ******* UPDATE DB SO EACH USER ONLY GETS ONE POND UPDATE EMAIL ********
  **********************************************************************
  ***********************************************************************/

  private updatePondSent(ourEmail: String){
    this.updateSubPond = this.httpClient.put("http://localhost:3000/api/userDataUpdate?" + "Email=" + ourEmail + "&EmailUpdateType=properties.pondSent", "true").subscribe();
    // ************ should .subscribe be here?
  }

  ngOnDestroy() {
    this.extraSub.unsubscribe();
    this.userSub.unsubscribe();
    this.hedgehogUserSub.unsubscribe();
    this.updateSub.unsubscribe();
    this.pondUserSub.unsubscribe();
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
