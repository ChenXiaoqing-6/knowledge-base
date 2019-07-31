import { EntityState } from "@ngrx/entity";
import { IArticle } from "../../models/IArticle";

export interface IKbSuggestedState extends EntityState<IArticle> {
    totalObjectCount: number;
    isLoading: boolean;
    isCompleted: boolean;
    isError: boolean;
}