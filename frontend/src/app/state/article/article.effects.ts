import { Injectable } from '@angular/core';
import { ModalService } from 'fundamental-ngx';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { exhaustMap } from "rxjs/operators";
import { ActionTypes, OpenArticle } from './article.actions';

import { KbDetailComponent } from '../../components/kb-detail/kb-detail.component';

@Injectable()
export class KbViewEffects {

  constructor(private actions$: Actions, private modalService: ModalService) {}

  @Effect()
  openArticle$ = this.actions$
    .pipe(
      ofType<OpenArticle>(ActionTypes.OpenArticle),
      exhaustMap(action => { 
        let dialogRef = this.modalService.open(KbDetailComponent, {
            data: {
              article: of(action.payload)
            },
            minWidth: '600px',
            hasBackdrop: true,
            backdropClickCloseable: false
          });
        return dialogRef.afterClosed;
      })
    );
}