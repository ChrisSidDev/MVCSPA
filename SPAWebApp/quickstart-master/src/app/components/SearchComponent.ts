/*
 * Angular
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingBarModule, LoadingBarService } from "ng2-loading-bar";

/*
 * Services
 */
import { TvMazeService } from '../services/TvMaze';

@Component({
    selector: 'search',
    template: `
<loading-bar color="#369" [height]="3" [animationTime]="0.3" [runInterval]="100" [progress]="0"></loading-bar>
<div class="content">
 <div class="row">
  <div class="form-inline search-box">
    <h1>Search</h1>
    <input placeholder="Search for a show" class="form-control col-xs-9 col-sm-10 col-md-10 col-lg-10" type="text" #newquery
      [value]="query"
      (keydown.enter)="submit(newquery.value)">
    <button class="btn btn-primary col-xs-3 col-sm-2 col-md-2 col-lg-2" (click)="submit(newquery.value)">Search</button>
     <div *ngIf="results">
      <div *ngIf="results.notFound ">
       <div class="text-muted col-xs-9">
        <small>No shows were found with the term '{{ query }}'</small>
       </div>
      </div>
      </div>
  </div>
 </div>
</div>

   <div *ngIf="results">
    <div class="results" *ngIf="!results.notFound">
      <h2>Results</h2>
       <div class="content">
              <div class="col-sm-6 col-xs-3 description">
                <div>Name: {{results.name}}</div>
                <div>Language: {{results.language}}</div>
                <div>Genres: <span *ngFor="let genre of results.genres;  let i=index">{{genre}}<span *ngIf="i<results.genres.length-1"> - </span></span></div>
                <div><a href="{{results.url}}">See more</a></div>
              </div>
             <div class="col-sm-6 col-xs-9">
               <div *ngIf="results.image">
                <a href="{{results.url}}"><img src="{{results.image.medium}}" class="img-responsive"/></a>
               </div>
            </div>
        </div>

      <div *ngIf="results">
       <div class="results-episodes">
        <div class="content">
            <h2>Episodes</h2>
             <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6 thumbnail" *ngFor="let result of results._embedded.episodes;  let i=index;">
                <div *ngIf="i<15">
                 <a href="{{result.url}}" *ngIf="result.image" target="_blank">
                    <img  class="img-responsive" src="{{result.image.medium}}"/>
                    <span class="caption">{{result.season}}.{{result.number}} {{result.name}}</span>
                 </a>
               </div>

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
        private route: ActivatedRoute,
        private loadingBarService: LoadingBarService) {
        this.route
            .queryParams
            .subscribe(params => { this.query = params['query'] || ''; });
    }

    emitStart() {
        this.loadingBarService.start();
    }

    emitStop() {
        this.loadingBarService.stop();
    }

    emitReset() {
        this.loadingBarService.reset();
    }

    emitComplete() {
        this.loadingBarService.complete();
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
        this.emitStart();
        this.tvmaze
            .search(this.query)
            .subscribe((res: any) => this.renderResults(res));
        
    }

    renderResults(res: any): void {
        this.results = null;
        this.emitComplete();
        if (res) {
            this.results = res;
        }
        console.log(this.results);
    }
}
