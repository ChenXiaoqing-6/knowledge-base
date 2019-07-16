import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { HandleError, ActionTypes } from './error-handling.actions';
// import { IState } from '..';
// import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from 'fundamental-ngx';
import { ErrorHandlingComponent } from '../../components/error-handling/error-handling.component';
import { switchMap } from 'rxjs/operators';



@Injectable()
export class ErrorHandlingEffects {
  constructor(
    private actions$: Actions,
    private alertService: AlertService
    // private store: Store<IState>
  ) {
  }

  @Effect() public onLoadError$ = this.actions$.pipe(
    ofType(ActionTypes.EffectError),
    switchMap(({ payload }: HandleError) => {

      if (payload.error instanceof HttpErrorResponse) {
        // swtich on codes
        console.error(payload.error.error);
      }

      if (payload.error instanceof Error) {
        console.error(payload.error);
      }


      const alertRef = this.alertService.open(ErrorHandlingComponent, {
        ...ErrorHandlingComponent.CONFIG,
        data: {
          label: payload.message
            ? payload.message
            : payload.error instanceof Error && payload.error.message
              ? payload.error.message
              : 'Sorry, an unexpected error occurred'
        }
      });

      if (payload.sourceAction) {
        alertRef.afterDismissed.subscribe(() => {
          // this.store.dispatch(payload.sourceAction as Action);
          // alertRef.dismiss();

          // Do something after closing
          // You can also manually close this alert using alertRef.dismiss()
        });
      }


      return of({ type: 'noop' });
    }));

}
