import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, map, withLatestFrom } from "rxjs/operators";
import { ActionTypes } from './config.actions';
import { ConfigService } from '../../services/config.service';
import { KbConfigFacade } from './config.facade'
import {
  GetGeneralConfig,
  GetGeneralConfigSuccess,
  GetAllProviderConfigError,
  GetAllProviderConfig,
  GetAllProviderConfigSuccess,
  GetGeneralConfigError,
  PutAllProviderConfig,
  PutAllProviderConfigSuccess,
  PutGeneralConfig,
  PutGeneralConfigSuccess
} from './config.actions';
import { IProviderConfigData } from '../../models/IProviderConfigData';

@Injectable()
export class KbConfigEffects {

  constructor(
    private actions$: Actions,
    private facade: KbConfigFacade,
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
            catchError(error => of(new GetGeneralConfigError({ error })))
          );
      })
    );

  @Effect()
  GetAllProviderConfig$ = this.actions$
    .pipe(
      ofType<GetAllProviderConfig>(ActionTypes.GetAllProviderConfig),
      switchMap((action) => {
        return this.ConfigService.getAllProviderConfig()
          .pipe(
            map(response => new GetAllProviderConfigSuccess(
              {
                data: response.data
              }
            )),
            catchError(error => of(new GetAllProviderConfigError({ error })))
          );
      })
    );

  @Effect()
  PutGeneralConfig$ = this.actions$
    .pipe(
      ofType<PutGeneralConfig>(ActionTypes.PutGeneralConfig),
      withLatestFrom(this.facade.isEnable()),
      switchMap(([action, isEnable]: [PutGeneralConfig, boolean]) => {
        return this.ConfigService.PutGeneralConfig(isEnable)
          .pipe(
            map(response => new PutGeneralConfigSuccess(
            ))
          );
      })
    );

  @Effect()
  PutAllProviderConfig$ = this.actions$
    .pipe(
      ofType<PutAllProviderConfig>(ActionTypes.PutAllProviderConfig),
      withLatestFrom(this.facade.allProviderConfig()),
      switchMap(([action, allProviderConfig]: [PutAllProviderConfig, IProviderConfigData[]]) => {
        return this.ConfigService.putAllProviderConfig(allProviderConfig)
          .pipe(
            map(response => new PutAllProviderConfigSuccess(
              allProviderConfig
            ))
          );
      })
    );


}