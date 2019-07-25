import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, tap, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActionTypes, OpenArticle, BackArticle, OpenArticleError } from './article.actions';
import { IArticle } from './../../models/IArticle';

@Injectable()
export class KbViewEffects {

  constructor(private actions$: Actions, private router: Router, private location: Location) { }

  @Effect({ dispatch: false })
  openArticle$ = this.actions$
    .pipe(
      ofType<OpenArticle>(ActionTypes.OpenArticle),
      map((action: any) => action.payload),
      tap((payload: IArticle) => this.router.navigate(['/kbDetail', payload])),
      catchError(error => of(new OpenArticleError(error)))
    );

  @Effect({ dispatch: false })
  backToSearchPage$ = this.actions$
    .pipe(
      ofType<BackArticle>(ActionTypes.BackArticle),
      tap(_ => this.location.back())
    );
}