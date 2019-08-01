import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { empty } from 'rxjs';
import { tap, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActionTypes, OpenArticle, BackArticle } from './article.actions';

@Injectable()
export class KbViewEffects {

  constructor(private actions$: Actions, private router: Router, private location: Location) { }

  @Effect({ dispatch: false })
  openArticle$ = this.actions$
    .pipe(
      ofType<OpenArticle>(ActionTypes.OpenArticle),
      map((action: any) => action.payload),
      tap((articleId: string) => {
        this.router.navigate([`kbDetail/${articleId}`]);
        return empty();
      })
    );

  @Effect({ dispatch: false })
  backToSearchPage$ = this.actions$
    .pipe(
      ofType<BackArticle>(ActionTypes.BackArticle),
      tap(_ => {
        this.location.back();
        return empty();
      })
    );
}