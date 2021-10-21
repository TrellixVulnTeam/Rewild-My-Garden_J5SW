import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
/* Our Components */
import { HomeComponent } from './pages/home-page/home/home.component';
import { NotFoundComponent } from './pages/not-found-page/not-found/not-found.component';
import { AccountInfoComponent } from './pages/account-page/account-info/account-info.component';
import { FormInputOutputComponent } from './pages/form-page/form-input-output/form-input-output.component';
import { LayoutComponent } from './display/layout/layout.component';
import { NavigationComponent } from './top-display/navigation/navigation.component';
import { SidenavListComponent } from './top-display/sidenav-list/sidenav-list.component';
import { TextBoxComponent } from './pages/form-page/text-box/text-box.component';
import { TextOutputComponent } from './pages/form-page/text-output/text-output.component';
import { AboutTextComponent } from './pages/about-page/about-text/about-text.component';
import { WildlifeAdviceComponent } from './pages/wildlife-advice-page/wildlife-advice/wildlife-advice.component';
/* Data Service */
import {DataService} from './data.service';
/* All material modules we are using */
import { MatModule } from './materials.module';

@NgModule({
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
    HttpClientModule
  ],
  declarations: [
    HomeComponent,
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    SidenavListComponent,
    TextBoxComponent,
    TextOutputComponent,
    AboutTextComponent,
    NotFoundComponent,
    FormInputOutputComponent,
    AccountInfoComponent,
    WildlifeAdviceComponent
    ],
  // "providers" is used for services
  providers: [
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
