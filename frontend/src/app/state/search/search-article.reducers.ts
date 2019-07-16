import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import { IKbSearchState, } from './search-article.state';
import { Actions, ActionTypes } from './search-article.actions';

export const adapter: EntityAdapter<IArticle> = createEntityAdapter<IArticle>();

export const initialKbSearchState: IKbSearchState = adapter.getInitialState({
    isInit: true,
    isLoading: false,
    searchTerm: "",
    pagination: PaginationHelper.create(),
    totalObjectCount: 0
});

export function reducer(state = initialKbSearchState, action: Actions): IKbSearchState {

    switch (action.type) {

        case ActionTypes.SearchArticles:

            return { ...state, isLoading: true, isInit: false, searchTerm: action.payload.searchTerm };

        case ActionTypes.SearchArticlesSuccess:
            let payload = action.payload;
            console.log("action: ", action);
            console.log("state1: ", state);
            if (action.clearState) {
                let _state = adapter.removeAll(state);
                console.log("state2: ", state, _state);
                _state = adapter.addAll(payload.data, { ...state, isLoading: false, totalObjectCount: payload.totalCount });
                console.log("state3: ", state, _state);
                return _state;
            } else {
                return adapter.addMany(payload.data, { ...state, isLoading: false });
            }

        case ActionTypes.SearchArticlesError:

            return { ...state, isLoading: false };

        case ActionTypes.SearchArticlesReset:

            return { ...initialKbSearchState };

        default: {

            return state;
        }

    }
}

export const {
    selectAll
} = adapter.getSelectors();