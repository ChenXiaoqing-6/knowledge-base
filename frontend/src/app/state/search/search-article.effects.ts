import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, empty } from 'rxjs';
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

@Injectable()
export class KbSearchEffects {

  constructor(
    private actions$: Actions,
    private facade: KbSearchFacade,
    private kbService: KbService) { }

  @Effect()
  searchArticles$ = this.actions$
    .pipe(
      ofType<SearchArticles>(ActionTypes.SearchArticles),
      switchMap((action) => {
        return this.kbService.searchArticles(action.payload)
          .pipe(
            map(response => new SearchArticlesSuccess(
              {
                data: response.data,
                pagination: action.payload.pagination,
                lastPage: response.lastPage,
                totalCount: response.totalObjectCount
              },
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
      withLatestFrom(this.facade.getNextPageSearchOptions()),
      switchMap(([action, searchOptions]: [LoadNextPage, ISearchOptions]) => {
        return searchOptions ? of(new SearchArticles(searchOptions)) : empty();
      })
    );

}









