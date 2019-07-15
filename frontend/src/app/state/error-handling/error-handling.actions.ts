import { Action } from '@ngrx/store';

export enum ActionTypes {
  EffectError = '[GENERAL] EffectError'
}

export class HandleError implements Action {
  public readonly type = ActionTypes.EffectError;
  constructor(public payload: { error: any, sourceAction?: Action | undefined, message?: string }) {
    // ctor
  }
}
