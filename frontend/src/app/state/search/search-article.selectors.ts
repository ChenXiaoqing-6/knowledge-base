import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IKbSearchState } from './search-article.state';
import * as fromReducers from '../search/search-article.reducers';

export const kbSearchState = createFeatureSelector<IKbSearchState>('kbSearch');

export const selectIsLoading = createSelector(
  kbSearchState,
  (state) => state.isLoading
);

export const selectPagination = createSelector(
  kbSearchState,
  (state) => state.pagination
);

export const selectAllArticles = createSelector(
  kbSearchState,
  fromReducers.selectAll
);

export const selectTotalObjectCount = createSelector(
  kbSearchState,
  (state) => state.totalObjectCount
);