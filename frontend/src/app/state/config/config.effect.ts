import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of} from 'rxjs';
import { catchError, switchMap, map } from "rxjs/operators";
import { ActionTypes, GetProviderConfigureData, GetProviderConfigureDataSuccess, GetProviderConfigureDataError } from './config.actions';
import { KbConfigService } from '../../services/kbConfig.service';


@Injectable()
export class KbConfigEffects {

  constructor(
    private actions$: Actions,
    private kbConfigService: KbConfigService) { }

  @Effect()
  getProviderConfigureData$ = this.actions$
    .pipe(
      ofType<GetProviderConfigureData>(ActionTypes.GetProviderConfigureData),
      switchMap((action) => {
        return this.kbConfigService.getProviderConfigureData()
          .pipe(
            map(response => new GetProviderConfigureDataSuccess(
              {
                data: response.data,
              },
            )),
            catchError(error => of(new GetProviderConfigureDataError({ error })))
          );
      })
    );

}









