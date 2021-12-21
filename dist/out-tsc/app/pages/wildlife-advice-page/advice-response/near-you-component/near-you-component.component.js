import { __decorate } from "tslib";
import { Component, HostListener } from "@angular/core";
import { Subscription } from "rxjs";
import { ProximityEnvironment } from "../proximity-env";
let NearYouComponentComponent = class NearYouComponentComponent {
    constructor(httpClient, allAnswersService) {
        this.httpClient = httpClient;
        this.allAnswersService = allAnswersService;
        //Subscriptions to wildlife answers data
        this.userSubOne = new Subscription();
        this.userSubTwo = new Subscription();
        this.userSubThree = new Subscription();
        this.ourAnswersService = new Subscription();
        this.latitude = 0;
        this.longitude = 0;
        this.adviceOne = {
            Header: "",
            Pathname: "",
            Justification: "",
            BodyText: "",
            Name: "",
            Username: "",
            Copyright: "",
            Link: "",
        };
        this.adviceTwo = {
            Header: "",
            Pathname: "",
            Justification: "",
            BodyText: "",
            Name: "",
            Username: "",
            Copyright: "",
            Link: "",
        };
        this.adviceThree = {
            Header: "",
            Pathname: "",
            Justification: "",
            BodyText: "",
            Name: "",
            Username: "",
            Copyright: "",
            Link: "",
        };
        this.displayArray = [
            this.adviceOne,
            this.adviceTwo,
            this.adviceThree,
        ];
        this.ourAnswersService = this.allAnswersService
            .getAnswerUpdateListener()
            .subscribe((retrievedAnswers) => {
            this.latitude = retrievedAnswers.latitude;
            this.longitude = retrievedAnswers.longitude;
            this.setUserDataInspo(ProximityEnvironment.INSPIRATION_PROXIMITY);
            this.setUserUsefulClose(ProximityEnvironment.USEFUL_PROXIMITY);
            this.setUserDataClose(ProximityEnvironment.CLOSEST);
        });
    }
    setUserDataInspo(proximity) {
        this.userSubOne = this.httpClient
            .get("https://rewildmygarden-api.azurewebsites.net/api/userData?Distance=" +
            proximity +
            "&Longitude=" +
            this.longitude +
            "&Latitude=" +
            this.latitude)
            .subscribe((response) => {
            const inspoArray = [];
            let count = 0;
            for (let i = 0; i < response.length; i++) {
                let ourUserData = response[i];
                for (let j = 0; j < ourUserData.properties.savedAdvice.length; j++) {
                    inspoArray[count] = {
                        Header: ourUserData.properties.savedAdvice[j].Header,
                        Pathname: ourUserData.properties.savedAdvice[j].Pathname,
                        Justification: ourUserData.properties.savedAdvice[j].Justification,
                        BodyText: ourUserData.properties.savedAdvice[j].BodyText,
                        Name: ourUserData.properties.savedAdvice[j].Name,
                        Username: ourUserData.properties.savedAdvice[j].Username,
                        Copyright: ourUserData.properties.savedAdvice[j].Copyright,
                        Link: ourUserData.properties.savedAdvice[j].Link,
                    };
                    count++;
                }
            }
            //If noone is detected in our largest radius we won't find anybody- so display default box
            if (inspoArray.length == 0) {
                document
                    .getElementById("NooneNear")
                    .classList.remove("hiddenElem");
            }
            //otherwise there are other users to be inspired by- display data
            else {
                //we don't want more than three examples- limited by inspoArray.length or 3, whichever comes first
                for (let m = 0; m < inspoArray.length && m < 3; m++) {
                    this.displayArray[m] = inspoArray[m];
                    document
                        .getElementById("Inspiration")
                        .classList.remove("hiddenElem");
                    document
                        .getElementById("SingleAdvice" + m)
                        .classList.remove("hiddenElem");
                }
            }
        }, (err) => {
            console.log(err);
        });
    }
    setUserUsefulClose(proximity) {
        this.userSubTwo = this.httpClient
            .get("https://rewildmygarden-api.azurewebsites.net/api/userData?Distance=" +
            proximity +
            "&Longitude=" +
            this.longitude +
            "&Latitude=" +
            this.latitude)
            .subscribe((response) => {
            const closeArray = [];
            let count = 0;
            for (let i = 0; i < response.length; i++) {
                let ourUserData = response[i];
                for (let j = 0; j < ourUserData.properties.savedAdvice.length; j++) {
                    closeArray[count] = {
                        Header: ourUserData.properties.savedAdvice[j].Header,
                        Pathname: ourUserData.properties.savedAdvice[j].Pathname,
                        Justification: ourUserData.properties.savedAdvice[j].Justification,
                        BodyText: ourUserData.properties.savedAdvice[j].BodyText,
                        Name: ourUserData.properties.savedAdvice[j].Name,
                        Username: ourUserData.properties.savedAdvice[j].Username,
                        Copyright: ourUserData.properties.savedAdvice[j].Copyright,
                        Link: ourUserData.properties.savedAdvice[j].Link,
                    };
                    count++;
                }
            }
            if (closeArray.length != 0) {
                for (let n = 0; n < closeArray.length; n++) {
                    if (closeArray[n].Header == "Put in a Small Water Feature" ||
                        closeArray[n].Header == "Create a Container Water Feature" ||
                        closeArray[n].Header == "Put in a Pond")
                        document
                            .getElementById("PondDistance")
                            .classList.remove("hiddenElem");
                }
            }
        }, (err) => {
            console.log(err);
        });
    }
    setUserDataClose(proximity) {
        this.userSubThree = this.httpClient
            .get("https://rewildmygarden-api.azurewebsites.net/api/userData?Distance=" +
            proximity +
            "&Longitude=" +
            this.longitude +
            "&Latitude=" +
            this.latitude)
            .subscribe((response) => {
            const closeArray = [];
            let count = 0;
            for (let i = 0; i < response.length; i++) {
                let ourUserData = response[i];
                for (let j = 0; j < ourUserData.properties.savedAdvice.length; j++) {
                    closeArray[count] = {
                        Header: ourUserData.properties.savedAdvice[j].Header,
                        Pathname: ourUserData.properties.savedAdvice[j].Pathname,
                        Justification: ourUserData.properties.savedAdvice[j].Justification,
                        BodyText: ourUserData.properties.savedAdvice[j].BodyText,
                        Name: ourUserData.properties.savedAdvice[j].Name,
                        Username: ourUserData.properties.savedAdvice[j].Username,
                        Copyright: ourUserData.properties.savedAdvice[j].Copyright,
                        Link: ourUserData.properties.savedAdvice[j].Link,
                    };
                    count++;
                }
            }
            if (closeArray.length != 0) {
                for (let n = 0; n < closeArray.length; n++) {
                    if (closeArray[n].Header == "Create a Hedgehog Hole Highway")
                        document
                            .getElementById("HedgehogDistance")
                            .classList.remove("hiddenElem");
                }
            }
        }, (err) => {
            console.log(err);
        });
    }
    ngOnInit() { }
    //This is called whenever this component is about to be removed from the DOM
    ngOnDestroy() {
        //By calling our subscription at this point and unsubscribing, we are preventing memory leaks
        this.userSubOne.unsubscribe();
        this.userSubTwo.unsubscribe();
        this.userSubThree.unsubscribe();
        this.ourAnswersService.unsubscribe();
    }
};
__decorate([
    HostListener("unloaded")
], NearYouComponentComponent.prototype, "ngOnDestroy", null);
NearYouComponentComponent = __decorate([
    Component({
        selector: "app-near-you-component",
        templateUrl: "./near-you-component.component.html",
        styleUrls: ["./near-you-component.component.scss"],
    })
], NearYouComponentComponent);
export { NearYouComponentComponent };
//# sourceMappingURL=near-you-component.component.js.map