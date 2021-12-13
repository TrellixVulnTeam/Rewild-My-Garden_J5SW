import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import axios from 'axios';

@Component({
  selector: 'app-email-send',
  templateUrl: './email-send.component.html',
  styleUrls: ['./email-send.component.scss']
})
export class EmailSendComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

//   //the email that the user has submitted
//   private email = "";

//   emailFormControl = new FormControl('', [Validators.required, Validators.email]);
//   matcher = new MyErrorStateMatcher();

//   public processEmailData(){
//     this.email = this.emailFormControl.value;
//     this.sendEmail()
//     this.saveUserData();
//   }

//   private sendEmail(){
//     if(this.savedAdvice.length == 0){
//       alert("You haven't saved any advice yet! Please select some advice and then re-enter your email.");
//     }
//     else{
//       const emailContent = { email: this.email, emailBody: this.getEmailContent()};
//       axios.post('http://localhost:3000/api/sendmail', emailContent)
//       .then(response => {
//         alert("An email was sent to " + this.email + ". Happy gardening!");
//       })
//       .catch(error => {
//           console.error('There was an error!', error);
//       });
//     }
//   }

//   private getEmailContent(): String{
//     let htmlString: String = '<head><link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"></head><body>' + 
//         '<p style="text-align: center; font-family:' + "'Playfair Display'" + ', serif; font-size: 30px;">Thank you for using Rewild My Garden!</p>' +
//         '<p style="text-align: center; font-size: 20px">Please see the advice you saved below: </p><br>';

//     for(let i=0; i<this.savedAdvice.length; i++){
//       htmlString = htmlString +"<div>" +
//         "<div>" +
//           '<p style="font-family:' + "'Playfair Display'" + ', serif; font-size: 20px; line-height: 0.8;">' + this.savedAdvice[i].Header + '</p>' +
//           "<p><b>" + this.savedAdvice[i].Justification + "</b></p>" +
//           "<p>" + this.savedAdvice[i].BodyText + "</p>" +
//         '</div>' +
//         '<br>';
//     }
//     htmlString = htmlString + "</body>"
//     return htmlString;
//   }
// }

// /** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
}
