import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IKbSuggestedState } from './suggested-article.state';
import * as fromReducers from '../suggestedList/suggested-article.reducers';

export const kbSuggestedState = createFeatureSelector<IKbSuggestedState>('kbSuggested');

export const selectIsLoading = createSelector(
    kbSuggestedState,
    (state) => state.isLoading
);

export const selectIsCompleted = createSelector(
    kbSuggestedState,
    (state) => state.isCompleted
);

export const selectAllArticles = createSelector(
    kbSuggestedState,
    fromReducers.selectAll
);

export const selectTotalObjectCount = createSelector(
    kbSuggestedState,
    (state) => state.totalObjectCount
);