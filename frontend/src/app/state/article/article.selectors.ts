import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IKbViewState } from './article.state';

export const kbViewState = createFeatureSelector<IKbViewState>('kbView');

export const selectIsContentLoading = createSelector(
    kbViewState,
    (state) => state.isContentLoading
);