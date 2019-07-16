import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, withLatestFrom } from "rxjs/operators";

import { ActionTypes } from './search-article.actions';
import { KbService } from '../../services/kb.service';
import {
  SearchArticles,
  SearchArticlesSuccess,
  SearchArticlesError,
  LoadNextPage
} from './search-article.actions';
import { KbSearchFacade } from './search-article.facade';
import { ISearchOptions } from '../../models/IRequestOptions';
import { AlertService } from 'fundamental-ngx';

@Injectable()
export class KbSearchEffects {

  constructor(
    private actions$: Actions, 
    private facade: KbSearchFacade, 
    private kbService: KbService,
    private alertService: AlertService) 
  {}

  @Effect()
  searchArticles$ = this.actions$
    .pipe(
      ofType<SearchArticles>(ActionTypes.SearchArticles),
      switchMap(action => { 
        return this.kbService.searchArticles(action.payload)
          .pipe(
            map(response => new SearchArticlesSuccess(
              { data: response.data, totalCount: response.totalObjectCount }, 
              action.payload.pagination.pageIndex === 1 
            )),
            catchError(error => of(new SearchArticlesError({ error })))
          );
      })
    );

    @Effect()
    loadNextPage$ = this.actions$
      .pipe(
        ofType<LoadNextPage>(ActionTypes.LoadNextPage),
        withLatestFrom(this.facade.getSearchOptions()),
        switchMap(([action, searchOptions]: [LoadNextPage, ISearchOptions]) => {
          return of(new SearchArticles(searchOptions));
        })
      );

      @Effect({dispatch: false})
      SearchError$ = this.actions$
        .pipe(
          ofType<SearchArticlesError>(ActionTypes.SearchArticlesError),
          switchMap((action) => {
            let errMsg = `Error occured: ${action.payload.error}`;
            this.alertService.open(errMsg, {
              type: 'error',
              dismissible: false,
              duration: 3000
            });
            return of('noop');
          })
        );
}









