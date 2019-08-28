import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IkbConfigState } from './config.state';
import * as fromReducers from './config.reducers';

export const kbConfigState = createFeatureSelector<IkbConfigState>('kbConfig');

export const selectIsEnable = createSelector(
    kbConfigState,
    (state) => state.isEnable
);

export const selectAllProviderConfig = createSelector(
    kbConfigState,
    fromReducers.selectAll
);

export const selectCurrentProviderConfigIndex = createSelector(
    kbConfigState,
    (state) => state.selectedProviderConfigIndex
);

export const selectIsGeneralConfigCompleted = createSelector(
    kbConfigState,
    (state) => state.isGeneralConfigCompleted
);

export const selectIsProviderConfigCompleted = createSelector(
    kbConfigState,
    (state) => state.isAllProviderConfigCompleted
);

export const selectActiveProviderConfigIndex = createSelector(
    kbConfigState,
    (state) => state.activeProviderConfigIndex
);