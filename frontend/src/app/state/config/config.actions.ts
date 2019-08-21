import { Action } from '@ngrx/store';
import { IKbProviderGeneralSettingData } from './../../models/IKbProviderGeneralSettingData'
import { IProviderConfigData } from './../../models/IProviderConfigData'

export enum ActionTypes {
    GetProviderConfigureData = '[KB-CONFIG-GET] GetProviderConfigureData',
    GetProviderConfigureDataSuccess = '[KB-CONFIG-GET] GetProviderConfigureDataSuccess',
    GetProviderConfigureDataError = '[KB-CONFIG-GET] GetProviderConfigureDataError',
    GetProviderGeneralSetting = '[KB-CONFIG-GET] GetProviderGeneralSetting',
    GetProviderGeneralSettingSuccess = '[KB-CONFIG-GET] GetProviderGeneralSettingSuccess',
    GetProviderGeneralSettingError = '[KB-CONFIG-GET] GetProviderGeneralSettingError'
}


export class GetProviderConfigureData implements Action {
    public readonly type = ActionTypes.GetProviderConfigureData;
    constructor() { }
}

export class GetProviderConfigureDataSuccess implements Action {
    public readonly type = ActionTypes.GetProviderConfigureDataSuccess;
    constructor(public payload: { data: IProviderConfigData[] }, public clearState: boolean = true) { }
}

export class GetProviderConfigureDataError implements Action {
    public readonly type = ActionTypes.GetProviderConfigureDataError;
    constructor(public payload: { error: any }) { }
}

export class GetProviderGeneralSetting implements Action {
    public readonly type = ActionTypes.GetProviderGeneralSetting;
    constructor() { }
}

export class GetProviderGeneralSettingSuccess implements Action {
    public readonly type = ActionTypes.GetProviderGeneralSettingSuccess;
    constructor(public payload: { data: IKbProviderGeneralSettingData[] }, public clearState: boolean = true) { }
}

export class GetProviderGeneralSettingError implements Action {
    public readonly type = ActionTypes.GetProviderGeneralSettingError;
    constructor(public payload: { error: any }) { }
}

export type Actions = GetProviderConfigureData
    | GetProviderConfigureDataSuccess
    | GetProviderConfigureDataError
    | GetProviderGeneralSetting
    | GetProviderGeneralSettingSuccess
    | GetProviderGeneralSettingError;