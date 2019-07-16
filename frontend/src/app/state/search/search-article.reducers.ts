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
            return { 
                ...state, 
                isLoading: true, 
                isInit: false, 
                searchTerm: action.payload.searchTerm,
                pagination: action.payload.pagination,
                totalObjectCount: 0
            };

        case ActionTypes.SearchArticlesSuccess:
            console.log("action, state: ", action, state);
            if (action.clearState) {
                return adapter.addAll(action.payload.data, { 
                    ...state, 
                    isLoading: false,
                    totalObjectCount: action.payload.totalCount 
                });
            } else {
                return adapter.addMany(action.payload.data, { 
                    ...state, 
                    isLoading: false,
                    totalObjectCount: action.payload.totalCount
                });
            }

        case ActionTypes.LoadNextPage:
            let _pagination = { ...state.pagination };
            _pagination.pageIndex++;
            return { ...state, isLoading: true, pagination: _pagination, totalObjectCount: 0 };

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