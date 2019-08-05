import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './authContext.state';

export const kbAuthContext = createFeatureSelector<State>('kbAuthContext');

export const selectAuthContext = createSelector(
  kbAuthContext,
  (state) => state
);
