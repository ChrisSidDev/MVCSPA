import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

/**
 * Querying the TVMAZE Web API
 * http://api.tvmaze.com/singlesearch/shows?q=Game%20of%20Thrones
 */

@Injectable()
export class TvMazeService {
    static BASE_URL: string = '';

    constructor(public http: Http) {
    }

    query(URL: string, params?: Array<string>): Observable<any[]> {
        let queryURL: string = `${TvMazeService.BASE_URL}${URL}`;
        if (params) {
            queryURL = `${queryURL}?${params.join('&')}`;
        }
        
        let body = JSON.stringify(queryURL);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/Movies', body, options)
            .map((response: Response) => <any>response.json());
        //return this.http.request(queryURL).map((res: any) => res.json());
    }

    search(query: string): Observable<any[]> {
        return this.query(``, [ `q=${query}`]);
    }
    
}

export var TVMAZE_PROVIDERS: Array<any> = [
    { provide: TvMazeService, useClass: TvMazeService }
];
