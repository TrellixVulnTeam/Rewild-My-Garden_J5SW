import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home-page/home/home.component';
import { NotFoundComponent } from './pages/not-found-page/not-found/not-found.component';
import { AccountInfoComponent } from './pages/account-page/account-info/account-info.component';
import { FormInputOutputComponent } from './pages/form-page/form-input-output/form-input-output.component';
import { DataDisplayTestComponent } from './pages/flower-data-test-page/data-display-test/data-display-test.component';

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
          path: 'account',
          component: AccountInfoComponent
        },
        {
          path: 'form-page',
          component: FormInputOutputComponent
        },
        {
          path: 'data-page',
          component: DataDisplayTestComponent
        },
        {
          path: '**',
          component: NotFoundComponent
        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
