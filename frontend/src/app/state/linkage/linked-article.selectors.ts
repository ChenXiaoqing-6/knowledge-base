import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IkbLinkedArticleState } from './linked-article.state';
import * as fromReducers from './linked-article.reducers';

export const kbLinkedArticleState = createFeatureSelector<IkbLinkedArticleState>('kbLinkedArticle');

export const selectIsLoading = createSelector(
    kbLinkedArticleState,
    (state) => state.isLoading
);

export const selectIsInit = createSelector(
    kbLinkedArticleState,
    (state) => state.isInit
);

export const selectAllArticles = createSelector(
    kbLinkedArticleState,
    fromReducers.selectAll
);

export const selectTotalObjectCount = createSelector(
    kbLinkedArticleState,
    (state) => state.totalObjectCount
);

export const selectIsError = createSelector(
    kbLinkedArticleState,
    (state) => state.isError
)