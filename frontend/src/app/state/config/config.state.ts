import { IProviderConfigData } from './../../models/IProviderConfigData';
import { EntityState } from '@ngrx/entity';


export interface IkbConfigState extends EntityState<IProviderConfigData> {
    isEnable: boolean;
    isGeneralConfigCompleted: boolean;
    selectedProviderConfigIndex: number;
    initialAllProviderConfig: IProviderConfigData[];
    isAllProviderConfigCompleted: boolean;
}