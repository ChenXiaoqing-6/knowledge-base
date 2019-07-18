import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reducer as kbSearchReducer } from './search/search-article.reducers';
import { reducer as kbViewReducer } from './article/article.reducers';
import { IKbSearchState } from './search/search-article.state';
import { IKbViewState} from './article/article.state';
import { KbSearchEffects } from './search/search-article.effects';
import { KbViewEffects } from './article/article.effects';

export interface IKbState {
  kbSearch: IKbSearchState,
  kbView: IKbViewState
}

export const reducers: ActionReducerMap<IKbState> = {
  kbSearch: kbSearchReducer,
  kbView: kbViewReducer
};

export const effects = [
  KbSearchEffects,
  KbViewEffects
];

export const metaReducers: MetaReducer<IKbState>[] = [];