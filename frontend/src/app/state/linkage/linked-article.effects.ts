import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from "rxjs/operators";

import { ActionTypes } from './linked-article.actions';
import { KbService } from '../../services/kb.service';
import {
  GetLinkedArticles,
  GetLinkedArticlesSuccess,
  GetLinkedArticlesError
} from './linked-article.actions';

@Injectable()
export class KbLinkedArticlesEffects {

  constructor(
    private actions$: Actions,
    private kbService: KbService) { }

  @Effect()
  getLinkedArticle$ = this.actions$
    .pipe(
      ofType<GetLinkedArticles>(ActionTypes.GetLinkedArticles),
      switchMap((action) => {
        return this.kbService.getLinkedArticles()
          .pipe(
            map(response => new GetLinkedArticlesSuccess(
              {
                data: response.data,
                totalCount: response.totalObjectCount
              }
            )),
            catchError(error => of(new GetLinkedArticlesError({ error })))
          );
      })
    );

}