// import { Injectable } from '@angular/core';
// import { select, Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { IKbConfigState } from './config.state';
// import { selectIsEnable, selectAllConfigData } from './config.selector';
// import { IProviderConfigData } from '../../models/IProviderConfigData';

// @Injectable()
// export class KbConfigFacade {

//   constructor(private store$: Store<IKbConfigState>) { }

//   public isEnable(): Observable<boolean> {
//     return this.store$.pipe(select(selectIsEnable));
//   }

//   // public isMindTouch(): Observable<boolean> {
//   //   return this.store$.pipe(select(selectIsMindTouch));
//   // }

//   public getProviderConfigureData(): Observable<IProviderConfigData[]> {
//     return this.store$.pipe(select(selectAllConfigData));
//   }


// }
