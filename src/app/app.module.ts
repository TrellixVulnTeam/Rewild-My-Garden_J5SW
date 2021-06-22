import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    //CommonModule and FlexLayoutModule might be better imported in a different 
    //module (see: https://code-maze.com/get-started-angular-material/)
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent
    ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
