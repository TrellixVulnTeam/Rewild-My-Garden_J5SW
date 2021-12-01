import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home-page/home/home.component';
import { NotFoundComponent } from './pages/not-found-page/not-found/not-found.component';
import { AboutTextComponent } from './pages/about-page/about-text/about-text.component';
import { WildlifeLayoutComponent } from './pages/wildlife-advice-page/wildlife-layout/wildlife-layout.component';
import { ExampleGardensBodyComponent } from './pages/example-gardens-page/example-gardens-body/example-gardens-body.component';

const routes: Routes = [
        { 
          path: 'home', 
          component: HomeComponent},
        { 
          path: '', 
          redirectTo: '/home', 
          pathMatch: 'full' 
        },
        {
          path: 'example-gardens-body',
          component: ExampleGardensBodyComponent
        }, 
        {
          path: 'about-page',
          component: AboutTextComponent
        },
        {
          path: 'wildlife-advice-page',
          component: WildlifeLayoutComponent
        },
        {
          path: '**',
          component: NotFoundComponent
        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
