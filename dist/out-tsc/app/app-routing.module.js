import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home-page/home/home.component';
import { NotFoundComponent } from './pages/not-found-page/not-found/not-found.component';
import { AboutTextComponent } from './pages/about-page/about-text/about-text.component';
import { WildlifeLayoutComponent } from './pages/wildlife-advice-page/wildlife-layout/wildlife-layout.component';
import { ExampleGardensBodyComponent } from './pages/example-gardens-page/example-gardens-body/example-gardens-body.component';
import { NotHomeLayoutComponent } from './display/not-home-layout/not-home-layout.component';
import { AboutMainTextComponent } from './pages/about-page/about-main-text/about-main-text.component';
import { AboutRewildingTextComponent } from './pages/about-page/about-rewilding-text/about-rewilding-text.component';
import { AboutPrivacyTextComponent } from './pages/about-page/about-privacy-text/about-privacy-text.component';
import { AboutResourcesTextComponent } from './pages/about-page/about-resources-text/about-resources-text.component';
const routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    //Routes for pages using main layout (not home page)
    {
        path: '',
        component: NotHomeLayoutComponent,
        children: [
            { path: 'inspiration', component: ExampleGardensBodyComponent },
            { path: 'wildlife-advice', component: WildlifeLayoutComponent },
            {
                path: '',
                component: AboutTextComponent,
                children: [
                    { path: 'about', component: AboutMainTextComponent },
                    { path: 'about-rewilding', component: AboutRewildingTextComponent },
                    { path: 'privacy', component: AboutPrivacyTextComponent },
                    { path: 'resources', component: AboutResourcesTextComponent }
                ]
            },
        ]
    },
    //Route for home page
    { path: 'home', component: HomeComponent },
    { path: '**', component: NotFoundComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map