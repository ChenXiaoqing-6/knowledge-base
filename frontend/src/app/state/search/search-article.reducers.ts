import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { IKbSearchState, } from './search-article.state';
import { Actions, ActionTypes } from './search-article.actions';

const PAGE_SIZE = 20;

export const adapter: EntityAdapter<IArticle> = createEntityAdapter<IArticle>();

export const initialKbSearchState: IKbSearchState = adapter.getInitialState({
    isInit: true,
    isLoading: false,
    searchTerm: "",
    pagination: {
        pageSize: PAGE_SIZE,
        pageIndex: 0
    },
    totalObjectCount: 0
});

export function reducer(state = initialKbSearchState, action: Actions): IKbSearchState {

    switch (action.type) {

        case ActionTypes.SearchArticles:

            return { ...state, isLoading: true, isInit: false, searchTerm: action.payload.searchTerm };

        case ActionTypes.SearchArticlesSuccess:
            let _state;
            let payload = action.payload;
            if (action.clearState) {
                _state = adapter.removeAll(state);
            }
            _state = adapter.addAll(payload.data, { ...state, isLoading: false, totalObjectCount: payload.totalCount });
            return _state;

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