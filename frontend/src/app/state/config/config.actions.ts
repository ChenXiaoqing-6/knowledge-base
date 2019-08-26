import { Action } from '@ngrx/store';
import { IProviderConfigData } from '../../models/IProviderConfigData';

export enum ActionTypes {
  GetGeneralConfig = '[KB-CONFIG] GetGeneralConfig',
  GetGeneralConfigSuccess = '[KB-CONFIG] GetGeneralConfigSuccess',
  GetGeneralConfigError = '[KB-CONFIG] GetGeneralConfigError',
  GetProviderConfig = '[KB-CONFIG] GetProviderConfig',
  GetProviderConfigSuccess = '[KB-CONFIG] GetProviderConfigSuccess',
  GetProviderConfigError = '[KB-CONFIG] GetProviderConfigError',
  ChangeSelectedProviderConfig = '[KB-CONFIG] ChangeSelectedProviderConfig',
  ChangeSelectedProviderConfigIndex = '[KB-CONFIG] ChangeSelectedProviderConfigIndex',
  PostAllProviderConfig = '[KB-CONFIG] PostAllProviderConfig',
  ChangeGeneralActive = '[KB-CONFIG] ChangeGeneralActive',
  ChangeSelectedProviderConfigActive = '[KB-CONFIG] ChangeSelectedProviderConfigActive',
  ReturnToInitialProviderConfig = '[KB-CONFIG] ReturnToInitialProviderConfig'
}

export class GetGeneralConfig implements Action {
  public readonly type = ActionTypes.GetGeneralConfig;
  constructor() { }
}

export class GetGeneralConfigSuccess implements Action {
  public readonly type = ActionTypes.GetGeneralConfigSuccess;
  constructor(public payload: { isEnable: boolean }) { }
}

export class GetGeneralConfigError implements Action {
  public readonly type = ActionTypes.GetGeneralConfigError;
  constructor(public payload: { error: any }) { }
}

export class GetProviderConfig implements Action {
  public readonly type = ActionTypes.GetProviderConfig;
  constructor() { }
}

export class GetProviderConfigSuccess implements Action {
  public readonly type = ActionTypes.GetProviderConfigSuccess;
  constructor(public payload: { data: IProviderConfigData[] }) { }
}

export class GetProviderConfigError implements Action {
  public readonly type = ActionTypes.GetProviderConfigError;
  constructor(public payload: { error: any }) { }
}

export class ChangeSelectedProviderConfig implements Action {
  public readonly type = ActionTypes.ChangeSelectedProviderConfig;
  constructor(public payload: any ) { }
}

export class ChangeSelectedProviderConfigIndex implements Action {
  public readonly type = ActionTypes.ChangeSelectedProviderConfigIndex;
  constructor(public payload: number) { }
}

export class PostAllProviderConfig implements Action {
  public readonly type = ActionTypes.PostAllProviderConfig;
  constructor() { };
}

export class ChangeGeneralActive implements Action {
  public readonly type = ActionTypes.ChangeGeneralActive;
  constructor() { };
}


export class ChangeSelectedProviderConfigActive implements Action {
  public readonly type = ActionTypes.ChangeSelectedProviderConfigActive;
  constructor(public payload: number) { };
}

export class ReturnToInitialProviderConfig implements Action {
  public readonly type = ActionTypes.ReturnToInitialProviderConfig;
  constructor() { };
}

export type Actions = GetGeneralConfig
  | GetGeneralConfigSuccess
  | GetGeneralConfigError
  | GetProviderConfig
  | GetProviderConfigSuccess
  | GetProviderConfigError
  | ChangeSelectedProviderConfig
  | ChangeSelectedProviderConfigIndex
  | PostAllProviderConfig
  | ChangeGeneralActive
  | ChangeSelectedProviderConfigActive
  | ReturnToInitialProviderConfig;