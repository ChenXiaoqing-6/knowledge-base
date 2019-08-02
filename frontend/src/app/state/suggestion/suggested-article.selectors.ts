import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IKbSuggestedState } from './suggested-article.state';
import * as fromReducers from './suggested-article.reducers';

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

export const selectIsError = createSelector(
    kbSuggestedState,
    (state) => state.isError
)

export const selectArticleById = createSelector(
    kbSuggestedState,
    (state, props) => state.entities[props.id]
  );
  