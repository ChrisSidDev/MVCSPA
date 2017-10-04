/*
 * Angular Imports
 */
import {
    Component
} from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { enableProdMode } from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    LocationStrategy,
    HashLocationStrategy,
    APP_BASE_HREF
} from '@angular/common';

/*
 * Components
 */
import { SearchComponent } from './app/components/SearchComponent';


/*
 * Services
 */
import { TVMAZE_PROVIDERS } from './app/services/TvMaze';



@Component({
    selector: 'router-app',
    template: '<router-outlet></router-outlet>'
})
class RoutesDemoApp {
    query: string;
}

const routes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: SearchComponent }
];

@NgModule({
    declarations: [
        RoutesDemoApp,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot(routes) // <-- routes
    ],
    bootstrap: [RoutesDemoApp],
    providers: [
        TVMAZE_PROVIDERS,
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
class RoutesDemoAppModule { }
enableProdMode();
platformBrowserDynamic().bootstrapModule(RoutesDemoAppModule)
    .catch((err: any) => console.error(err));

