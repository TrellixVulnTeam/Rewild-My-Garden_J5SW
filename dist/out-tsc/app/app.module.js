import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/* Our Components */
import { HomeComponent } from './pages/home-page/home/home.component';
import { NotFoundComponent } from './pages/not-found-page/not-found/not-found.component';
import { LayoutComponent } from './display/layout/layout.component';
import { NavigationComponent } from './display/top-display/navigation/navigation.component';
import { SidenavListComponent } from './display/top-display/sidenav-list/sidenav-list.component';
import { AboutTextComponent } from './pages/about-page/about-text/about-text.component';
import { WildlifeMultiplechoiceComponent } from './pages/wildlife-advice-page/advice-questions/wildlife-multiplechoice/wildlife-multiplechoice.component';
import { WildlifeLayoutComponent } from './pages/wildlife-advice-page/wildlife-layout/wildlife-layout.component';
import { ExampleGardensBodyComponent } from './pages/example-gardens-page/example-gardens-body/example-gardens-body.component';
import { WildlifeAdviceGenericComponent } from './pages/wildlife-advice-page/advice-response/wildlife-advice-generic/wildlife-advice-generic.component';
import { WildlifeInfoGenericComponent } from './pages/wildlife-advice-page/advice-response/wildlife-info-generic/wildlife-info-generic.component';
import { PollinatorSuggestionsComponent } from './pages/wildlife-advice-page/advice-response/pollinator-suggestions/pollinator-suggestions.component';
import { PollinatorDialogComponent } from './pages/wildlife-advice-page/advice-response/pollinator-dialog/pollinator-dialog.component';
/* Our Services */
import { WildlifeAnswers } from './pages/wildlife-advice-page/services/multichoice-answers.service';
import { WildlifeResponse } from './pages/wildlife-advice-page/services/pollinator-suggestions.service';
import { AdviceService } from './pages/wildlife-advice-page/services/advice-boxes.service';
import { InfoService } from './pages/wildlife-advice-page/services/info-boxes.service';
/* Data Service */
import { DataService } from './data.service';
/* All material modules we are using */
import { MatModule } from './materials.module';
import { WildlifeAdviceDialogComponent } from './pages/wildlife-advice-page/advice-response/wildlife-advice-dialog/wildlife-advice-dialog.component';
import { FindPostcodeComponent } from './pages/wildlife-advice-page/advice-questions/find-postcode/find-postcode.component';
import { NearYouComponentComponent } from './pages/wildlife-advice-page/advice-response/near-you-component/near-you-component.component';
import { AllAnswers } from './pages/wildlife-advice-page/services/all-answers.service';
import { LocationAnswers } from './pages/wildlife-advice-page/services/location-answer.service';
import { NotHomeLayoutComponent } from './display/not-home-layout/not-home-layout.component';
import { AboutMainTextComponent } from './pages/about-page/about-main-text/about-main-text.component';
import { AboutRewildingTextComponent } from './pages/about-page/about-rewilding-text/about-rewilding-text.component';
import { AboutPrivacyTextComponent } from './pages/about-page/about-privacy-text/about-privacy-text.component';
import { AboutResourcesTextComponent } from './pages/about-page/about-resources-text/about-resources-text.component';
import { EmailSendComponent } from './pages/wildlife-advice-page/email-send/email-send.component';
import { DisplayUserResponseComponent } from './pages/wildlife-advice-page/advice-response/display-user-response/display-user-response.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        imports: [
            MatModule,
            BrowserModule,
            ReactiveFormsModule,
            BrowserModule,
            BrowserAnimationsModule,
            CommonModule,
            FlexLayoutModule,
            AppRoutingModule,
            FormsModule,
            HttpClientModule,
            NgbModule
        ],
        declarations: [
            HomeComponent,
            AppComponent,
            LayoutComponent,
            NavigationComponent,
            SidenavListComponent,
            AboutTextComponent,
            NotFoundComponent,
            WildlifeMultiplechoiceComponent,
            WildlifeLayoutComponent,
            ExampleGardensBodyComponent,
            WildlifeInfoGenericComponent,
            WildlifeAdviceGenericComponent,
            PollinatorDialogComponent,
            PollinatorSuggestionsComponent,
            WildlifeAdviceDialogComponent,
            FindPostcodeComponent,
            NearYouComponentComponent,
            NotHomeLayoutComponent,
            AboutMainTextComponent,
            AboutRewildingTextComponent,
            AboutPrivacyTextComponent,
            AboutResourcesTextComponent,
            EmailSendComponent,
            DisplayUserResponseComponent,
        ],
        entryComponents: [
            PollinatorDialogComponent,
            WildlifeAdviceDialogComponent
        ],
        // "providers" is used for services
        providers: [
            DataService,
            WildlifeAnswers,
            WildlifeResponse,
            AdviceService,
            InfoService,
            AllAnswers,
            LocationAnswers,
        ],
        bootstrap: [
            AppComponent
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map