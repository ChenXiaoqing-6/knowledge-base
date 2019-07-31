import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IKbSearchState } from './search-article.state';
import * as fromReducers from '../search/search-article.reducers';

export const kbSearchState = createFeatureSelector<IKbSearchState>('kbSearch');

export const selectIsLoading = createSelector(
  kbSearchState,
  (state) => state.isLoading
);

export const selectIsInit = createSelector(
  kbSearchState,
  (state) => state.isInit
);

export const selectPagination = createSelector(
  kbSearchState,
  (state) => state.pagination
);

export const selectSearchTerm = createSelector(
  kbSearchState,
  (state) => state.searchTerm
);

export const selectAllArticles = createSelector(
  kbSearchState,
  fromReducers.selectAll
);

export const selectLastPage = createSelector(
  kbSearchState,
  (state) => state.lastPage
);

export const selectIsError = createSelector(
  kbSearchState,
  (state) => state.isError
)

export const selectTotalObjectCount = createSelector(
  kbSearchState,
  (state) => state.totalObjectCount
);

export const selectArticleById = createSelector(
  kbSearchState,
  (state, props) => state.entities[props.id]
);