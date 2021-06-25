import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
/* Our Components */
import { HomeComponent } from './home-page/home/home.component';
import { TopBarComponent } from './top-display/top-bar/top-bar.component';
import { LayoutComponent } from './display/layout/layout.component';
import { NavigationComponent } from './top-display/navigation/navigation.component';
import { SidenavListComponent } from './top-display/sidenav-list/sidenav-list.component';
/* All material modules we are using */
import { MatModule } from './materials.module';
import { TextBoxComponent } from './form-page/text-box/text-box.component';

@NgModule({
  imports: [
    MatModule,
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      }]),
    BrowserModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FlexLayoutModule,
    AppRoutingModule,
  ],
  declarations: [
    HomeComponent,
    AppComponent,
    TopBarComponent,
    LayoutComponent,
    NavigationComponent,
    SidenavListComponent,
    TextBoxComponent
    ],
  providers: [
    HomeComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
