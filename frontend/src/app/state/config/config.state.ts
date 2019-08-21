import { IProviderConfigData } from "../../models/IProviderConfigData";
import { EntityState } from "@ngrx/entity";

export interface IKbConfigState extends EntityState<IProviderConfigData>{
    isEnable: boolean;
    isError:boolean;
}