import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, empty } from 'rxjs';
import { catchError, switchMap, map } from "rxjs/operators";

import { ActionTypes } from './linked-article.actions';
import { KbService } from '../../services/kb.service';
import {
  GetLinkedArticles,
  GetLinkedArticlesSuccess,
  GetLinkedArticlesError
} from './linked-article.actions';
import { AlertService } from 'fundamental-ngx';

@Injectable()
export class KbLinkedArticlesEffects {

  constructor(
    private actions$: Actions,
    private kbService: KbService,
    private alertService: AlertService) { }

  @Effect()
  GetLinkedArticle$ = this.actions$
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

  @Effect({ dispatch: false })
  GetLinkedArticleError$ = this.actions$
    .pipe(
      ofType<GetLinkedArticlesError>(ActionTypes.GetLinkedArticlesError),
      switchMap((action) => {
        let errMsg = `Cannot get linked articles because: ${action.payload.error}`;
        this.alertService.open(errMsg, {
          type: 'error',
          dismissible: false,
          duration: 3000
        });
        return empty();
      })
    );
}