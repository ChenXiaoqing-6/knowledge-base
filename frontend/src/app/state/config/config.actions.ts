import { Action } from '@ngrx/store';
import { IProviderConfigData } from '../../models/IProviderConfigData';

export enum ActionTypes {
  GetGeneralConfig = '[KB-CONFIG] GetGeneralConfig',
  GetGeneralConfigSuccess = '[KB-CONFIG] GetGeneralConfigSuccess',
  GetGeneralConfigError = '[KB-CONFIG] GetGeneralConfigError',
  GetAllProviderConfig = '[KB-CONFIG] GetAllProviderConfig',
  GetAllProviderConfigSuccess = '[KB-CONFIG] GetAllProviderConfigSuccess',
  GetAllProviderConfigError = '[KB-CONFIG] GetAllProviderConfigError',
  TempSaveSelectedProviderConfig = '[KB-CONFIG] TempSaveSelectedProviderConfig',
  ChangeSelectedProviderConfigIndex = '[KB-CONFIG] ChangeSelectedProviderConfigIndex',
  PutAllProviderConfig = '[KB-CONFIG] PutAllProviderConfig',
  PutAllProviderConfigSuccess = '[KB-CONFIG] PutAllProviderConfigSuccess',
  PutGeneralConfig = '[KB-CONFIG] PutGeneralConfig',
  PutGeneralConfigSuccess = '[KB-CONFIG] PutGeneralConfigSuccess',
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

export class GetAllProviderConfig implements Action {
  public readonly type = ActionTypes.GetAllProviderConfig;
  constructor() { }
}

export class GetAllProviderConfigSuccess implements Action {
  public readonly type = ActionTypes.GetAllProviderConfigSuccess;
  constructor(public payload: { data: IProviderConfigData[] }) { }
}

export class GetAllProviderConfigError implements Action {
  public readonly type = ActionTypes.GetAllProviderConfigError;
  constructor(public payload: { error: any }) { }
}

export class TempSaveSelectedProviderConfig implements Action {
  public readonly type = ActionTypes.TempSaveSelectedProviderConfig;
  constructor(public payload: any) { }
}

export class ChangeSelectedProviderConfigIndex implements Action {
  public readonly type = ActionTypes.ChangeSelectedProviderConfigIndex;
  constructor(public payload: number) { }
}

export class PutAllProviderConfig implements Action {
  public readonly type = ActionTypes.PutAllProviderConfig;
  constructor() { };
}

export class PutAllProviderConfigSuccess implements Action {
  public readonly type = ActionTypes.PutAllProviderConfigSuccess;
  constructor(public payload: IProviderConfigData[]) { };
}

export class PutGeneralConfig implements Action {
  public readonly type = ActionTypes.PutGeneralConfig;
  constructor() { };
}

export class PutGeneralConfigSuccess implements Action {
  public readonly type = ActionTypes.PutGeneralConfigSuccess;
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
  | GetAllProviderConfig
  | GetAllProviderConfigSuccess
  | GetAllProviderConfigError
  | TempSaveSelectedProviderConfig
  | ChangeSelectedProviderConfigIndex
  | PutAllProviderConfig
  | PutAllProviderConfigSuccess
  | ChangeGeneralActive
  | ChangeSelectedProviderConfigActive
  | ReturnToInitialProviderConfig
  | PutGeneralConfig
  | PutGeneralConfigSuccess;