import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from "rxjs/operators";

import { ActionTypes } from './search-article.actions';
import { KbService } from '../../services/kb.service';
import {
  SearchArticles,
  SearchArticlesSuccess,
  SearchArticlesError
} from './search-article.actions';

@Injectable()
export class KbSearchEffects {

  constructor(private actions$: Actions, private kbService: KbService) {}

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

}









