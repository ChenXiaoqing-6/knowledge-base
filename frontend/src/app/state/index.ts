import { ActionReducerMap } from '@ngrx/store';
import { reducer as kbSearchReducer } from './search/search-article.reducers';
import { IKbSearchState } from './search/search-article.state';
import { KbSearchEffects } from './search/search-article.effects';

export interface IKbState {
  kbSearch: IKbSearchState
}

export const reducers: ActionReducerMap<IKbState> = {
  kbSearch: kbSearchReducer
};

export const effects = [
  KbSearchEffects
];