/*
 * Angular
 */

import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

/*
 * Services
 */
import { TvMazeService } from '../services/TvMaze';

@Component({
    selector: 'search',
    template: `
  <div class="form-inline search-box">
    <h1>Search</h1>
    <input placeholder="Search for a show" class="form-control" type="text" #newquery
      [value]="query"
      (keydown.enter)="submit(newquery.value)">
    <button class="btn btn-primary" (click)="submit(newquery.value)">Search</button>
     <div *ngIf="results">
      <div *ngIf="results.notFound ">
       <div class="text-muted">
        <small>No shows were found with the term '{{ query }}'</small>
       </div>
      </div>
      </div>
  </div>
   <div *ngIf="results">
    <div class="results" *ngIf="!results.notFound">
      <h1>Results</h1>
       <div class="content">
              <div class="col-sm-6 description">
                <div>Name: {{results.name}}</div>
                <div>Language: {{results.language}}</div>
                <div>Genres: <span *ngFor="let genre of results.genres;  let i=index">{{genre}}<span *ngIf="i<results.genres.length-1"> - </span></span></div>
                <div><a href="{{results.url}}">See more</a></div>
              </div>
             <div class="col-sm-6">
               <div *ngIf="results.image">
                <a href="{{results.url}}"><img src="{{results.image.medium}}" class="img-responsive"/></a>
               </div>
            </div>
        </div>

      <div *ngIf="results">
       <div class="results">
        <div class="content">
            <h2>Episodes</h2>
              <div class="col-sm-4 image-result" *ngFor="let result of results._embedded.episodes;  let i=index;">
                <div *ngIf="i<10">
                 <a href="{{result.url}}" *ngIf="result.image"><img src="{{result.image.medium}}"/></a>
                 <div class="caption">{{result.season}}.{{result.number}} {{result.name}}</div>
               </div>
             </div>
             
        </div>
       </div>
      </div>

    </div>
   </div>
  `
})
export class SearchComponent implements OnInit {
    query: string;
    results: Object;

    constructor(private tvmaze: TvMazeService,
        private router: Router,
        private route: ActivatedRoute) {
        this.route
            .queryParams
            .subscribe(params => { this.query = params['query'] || ''; });
    }

    ngOnInit(): void {
        this.search();
    }

    submit(query: string): void {
        this.router.navigate(['search'], { queryParams: { query: query } })
            .then(_ => this.search());
    }

    search(): void {
        console.log('this.query', this.query);
        if (!this.query) {
            return;
        }

        this.tvmaze
            .search(this.query)
            .subscribe((res: any) => this.renderResults(res));
        
    }

    renderResults(res: any): void {
        this.results = null;
        if (res) {
            this.results = res;
        }
        console.log(this.results);
    }
}
