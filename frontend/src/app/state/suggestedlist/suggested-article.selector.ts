import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IKbSuggestedState } from "./suggested-article.state";
import * as formReducers from './suggested-article.reducers';


export const kbSuggestedState = createFeatureSelector<IKbSuggestedState>('kbSuggestedArticles');

export const selectAllArticles = createSelector(
    kbSuggestedState,
    formReducers.selectAll
);

export const selectTotalObjectCount = createSelector(
    kbSuggestedState,
    (state) => state.totalObjectCount
);

export const selectIsCompleted = createSelector(
    kbSuggestedState,
    (state) => state.isCompleted
);

export const selectIsLoading = createSelector(
    kbSuggestedState,
    (state) => state.isLoading
);

