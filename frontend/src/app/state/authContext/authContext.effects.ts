import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { 
  Actions as AuthContextActions, 
  ActionTypes, 
  AuthContextLoaded, 
  AwaitAuthContextLoaded, 
  RequireExternalAuthentication 
} from './authContext.actions';
import { IFrameMessageAdapter } from '../../services/iframe.message.service';

@Injectable()
export class AuthContextEffects {
  constructor(
    private actions$: Actions<AuthContextActions>,
    private iframeMessageAdapter: IFrameMessageAdapter
  ) { }

  @Effect() public authContextLoaded$ = this.actions$.pipe(
    ofType(ActionTypes.AwaitAuthContextLoaded),
    switchMap((it: AwaitAuthContextLoaded) => {
      return of(new RequireExternalAuthentication(it.payload));
    }));

  @Effect() public externalAuthFlow$ = this.actions$.pipe(
    ofType(ActionTypes.RequireExternalAuthentication),
    switchMap((action: RequireExternalAuthentication) => {
      return this.iframeMessageAdapter.getAuthContextFromIframe()
        .pipe(
          map(response => new AuthContextLoaded(response)),
          catchError(error => {
            console.log("[ERROR]:", error);
            return of({ error, sourceAction: action })
          })
        );
    }));

}
