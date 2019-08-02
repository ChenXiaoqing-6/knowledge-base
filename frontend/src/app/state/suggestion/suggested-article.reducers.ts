import { IKbSuggestedState } from "./suggested-article.state";
import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { IArticle } from "../../models/IArticle";
import { ActionTypes, Actions } from "./suggested-article.actions";


export const adapter:EntityAdapter<IArticle> = createEntityAdapter<IArticle>();

export const initialKbSuggestedState:IKbSuggestedState = adapter.getInitialState({
    isInit: false,
    isLoading: false,
    isError: false,
    totalObjectCount: 0
})

export function reducer(state = initialKbSuggestedState,action:Actions):IKbSuggestedState{

    switch(action.type){

        case ActionTypes.SuggestedArticles:
            return {
                ...initialKbSuggestedState,
                isInit: true,
                isLoading: true
            };

        case ActionTypes.SuggestedArticlesSuccess:
            return adapter.addAll(action.payload.data,{
                ...state,
                isLoading: false,
                totalObjectCount: action.payload.totalCount
            });

        case ActionTypes.SuggestedArticlesError:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default: {
            return state;
        }
    }
}

export const{
    selectAll
} = adapter.getSelectors();