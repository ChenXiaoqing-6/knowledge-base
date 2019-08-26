import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map } from "rxjs/operators";
import { ActionTypes } from './config.actions';
import { ConfigService } from '../../services/config.service';
import {
  GetGeneralConfig,
  GetGeneralConfigSuccess,
  GetProviderConfigError,
  GetProviderConfig,
  GetProviderConfigSuccess,
  GetGeneralConfigError
} from './config.actions';

@Injectable()
export class KbConfigEffects {

  constructor(
    private actions$: Actions,
    private ConfigService: ConfigService) { }

  @Effect()
  GetGeneralConfig$ = this.actions$
    .pipe(
      ofType<GetGeneralConfig>(ActionTypes.GetGeneralConfig),
      switchMap((action) => {
        return this.ConfigService.GetGeneralConfig()
          .pipe(
            map(response => new GetGeneralConfigSuccess(
              {
                isEnable: response.isEnable
              }
            )),
            catchError(error => of(new GetProviderConfigError({ error })))
          );
      })
    );

    @Effect()
    GetProviderConfig$ = this.actions$
      .pipe(
        ofType<GetProviderConfig>(ActionTypes.GetProviderConfig),
        switchMap((action) => {
          return this.ConfigService.getAllProviderConfig()
            .pipe(
              map(response => new GetProviderConfigSuccess(
                {
                  data: response.data
                }
              )),
              catchError(error => of(new GetGeneralConfigError({ error })))
            );
        })
      );

}