import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutComponent } from './layout/layout.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { MatListModule } from '@angular/material/list';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        component: HomeComponent
      }]),
    BrowserModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    //Below imports might be better imported in a different 
    //module (see: https://code-maze.com/get-started-angular-material/)
    CommonModule,
    FlexLayoutModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatListModule,
    MatMenuModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    LayoutComponent,
    NavigationComponent,
    SidenavListComponent
    ],
  // WORK OUT WHAT THIS IS DOING
  providers: [
    HomeComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
