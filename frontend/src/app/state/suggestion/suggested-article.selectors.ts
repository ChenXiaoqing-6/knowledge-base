import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IKbSuggestedState } from './suggested-article.state';
import * as fromReducers from './suggested-article.reducers';

export const kbSuggestedState = createFeatureSelector<IKbSuggestedState>('kbSuggested');

export const selectIsLoading = createSelector(
    kbSuggestedState,
    (state) => state.isLoading
);

export const selectIsInit = createSelector(
    kbSuggestedState,
    (state) => state.isInit
);

export const selectAllArticles = createSelector(
    kbSuggestedState,
    fromReducers.selectAll
);

export const selectTotalObjectCount = createSelector(
    kbSuggestedState,
    fromReducers.selectTotal
);

export const selectIsError = createSelector(
    kbSuggestedState,
    (state) => state.isError
);