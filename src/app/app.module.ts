import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
/* Our Components */
import { HomeComponent } from './home-page/home/home.component';
import { TopBarComponent } from './top-display/top-bar/top-bar.component';
import { LayoutComponent } from './display/layout/layout.component';
import { NavigationComponent } from './top-display/navigation/navigation.component';
import { SidenavListComponent } from './top-display/sidenav-list/sidenav-list.component';
import { TextBoxComponent } from './form-page/text-box/text-box.component';
import { TextOutputComponent } from './form-page/text-output/text-output.component';

/* All material modules we are using */
import { MatModule } from './materials.module';

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
    FormsModule
  ],
  declarations: [
    HomeComponent,
    AppComponent,
    TopBarComponent,
    LayoutComponent,
    NavigationComponent,
    SidenavListComponent,
    TextBoxComponent,
    TextOutputComponent
    ],
  providers: [
    HomeComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
