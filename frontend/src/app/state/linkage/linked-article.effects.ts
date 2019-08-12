import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AlertService } from 'fundamental-ngx';
import { of, empty } from 'rxjs';
import { catchError, switchMap, map } from "rxjs/operators";
import {
  ActionTypes,
  LinkArticle,
  LinkArticleSuccess,
  LinkArticleError,
  UnlinkArticle,
  UnlinkArticleSuccess,
  UnlinkArticleError
} from './linked-article.actions';
import { KbService } from '../../services/kb.service';
import {
  GetLinkedArticles,
  GetLinkedArticlesSuccess,
  GetLinkedArticlesError
} from './linked-article.actions';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class KbLinkedArticlesEffects {

  constructor(
    private actions$: Actions,
    private kbService: KbService,
    private alertService: AlertService,
    private translateService: TranslateService) { }

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

  @Effect()
  postArticleLinkage$ = this.actions$
    .pipe(
      ofType<LinkArticle>(ActionTypes.LinkArticle),
      switchMap((action) => {
        return this.kbService.postArticleLinkage(action.payload.articleLinkage)
          .pipe(
            map(_ => {
              return new LinkArticleSuccess(action.payload);
            }),
            catchError(error => of(new LinkArticleError({ error })))
          )
      })
    );

  @Effect()
  deleteArticleLinkage$ = this.actions$
    .pipe(
      ofType<UnlinkArticle>(ActionTypes.UnlinkArticle),
      switchMap((action) => {
        return this.kbService.deleteArticleLinkage(action.payload)
          .pipe(
            map(_ => {
              return new UnlinkArticleSuccess({
                articleLinkage: action.payload
              });
            }),
            catchError(error => of(new UnlinkArticleError({ error })))
          )
      })
    );

  @Effect({ dispatch: false })
  showLinkArticleSuccessMsg$ = this.actions$
    .pipe(
      ofType<LinkArticleSuccess>(ActionTypes.LinkArticleSuccess),
      switchMap((_) => {
        this.alertService.open(this.translateService.instant('KB_ARTICLE_ACTIONS_LINK_CASE'), {
          type: 'information',
          dismissible: false,
          duration: 3000
        });
        return empty();
      })
    );

  @Effect({ dispatch: false })
  showUnlinkArticleSuccessMsg$ = this.actions$
    .pipe(
      ofType<UnlinkArticleSuccess>(ActionTypes.UnlinkArticleSuccess),
      switchMap((_) => {
        this.alertService.open(this.translateService.instant('KB_ARTICLE_ACTIONS_UNLINK_CASE'), {
          type: 'information',
          dismissible: false,
          duration: 3000
        });
        return empty();
      })
    );

}