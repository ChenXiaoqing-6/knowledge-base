import { EntityState } from "@ngrx/entity";
import { IArticle } from "../../models/IArticle";

export interface IKbSuggestedState extends EntityState<IArticle> {
    isLoading: boolean;
    isInit: boolean;
    isError: boolean;
}