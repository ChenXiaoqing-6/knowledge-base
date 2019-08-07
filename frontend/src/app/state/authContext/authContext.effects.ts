import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { IFrameMessageAdapter } from '../../services/iframe.message.service';
import { TranslationService } from '../../services/translation.service';
import { Actions as AuthContextActions, ActionTypes, AuthContextLoaded, AwaitAuthContextLoaded, RequireAuthentication } from './authContext.actions';
import { IAuthContext } from './IAuthContext';

@Injectable()
export class AuthContextEffects {
  constructor(
    private actions$: Actions<AuthContextActions>,
    private translationService: TranslationService,
    private iframeMessageAdapter: IFrameMessageAdapter
  ) { }

  @Effect() public authContextLoaded$ = this.actions$.pipe(
    ofType(ActionTypes.AwaitAuthContextLoaded),
    switchMap((action: AwaitAuthContextLoaded) => {
      return of(new RequireAuthentication(action.payload));
    }));

  @Effect() public onReady$ = combineLatest(
    this.actions$.pipe(ofType<AuthContextLoaded>(ActionTypes.AuthContextLoaded))
  ).pipe(
    take(1),
    switchMap(([contextReady]) => {
      const selectedLocale = contextReady.payload.selectedLocale || "en";
      // initialize translation repository (side effect => loads translations)
      const langKey = selectedLocale.indexOf('-') !== -1
        ? selectedLocale.split('-')[0]
        : selectedLocale;
      this.translationService.loadTranslations(langKey).subscribe();
      return of({ type: 'noop' });
    })
  );

  @Effect() public authFlow$ = this.actions$.pipe(
    ofType(ActionTypes.RequireAuthentication),
    switchMap(action => {
      return this.iframeMessageAdapter.getAuthContextFromIframe()
        .pipe(
          map((authContext: IAuthContext) => new AuthContextLoaded(authContext)),
          catchError(error => {
            return of({ error, sourceAction: action })
          })
        );
    }));

}
