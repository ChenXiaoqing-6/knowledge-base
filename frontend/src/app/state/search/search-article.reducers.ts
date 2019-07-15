import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { IKbSearchState, } from './search-article.state';
import { Actions, ActionTypes } from './search-article.actions';

const PAGE_SIZE = 20;

export const adapter: EntityAdapter<IArticle> = createEntityAdapter<IArticle>();

export const initialKbSearchState: IKbSearchState = adapter.getInitialState({
    isInit: true,
    isLoading: false,
    pagination: {
        pageSize: PAGE_SIZE,
        pageIndex: 0
    },
    totalObjectCount: 0
});

export function reducer(state = initialKbSearchState, action: Actions): IKbSearchState {

    switch (action.type) {

        case ActionTypes.SearchArticles:

            return { ...state, isLoading: true, isInit: false };

        case ActionTypes.SearchArticlesSuccess:
            let payload = action.payload;
            return adapter.addAll(payload.data, { ...state, isLoading: false, totalObjectCount: payload.totalCount });

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