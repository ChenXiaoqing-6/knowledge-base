import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reducer as kbSearchReducer } from './search/search-article.reducers';
import { reducer as kbSuggestedReducer } from './suggestedlist/suggested-article.reducers';
import { reducer as kbViewReducer } from './article/article.reducers';
import { IKbSearchState } from './search/search-article.state';
import { IKbViewState} from './article/article.state';
import { KbSearchEffects } from './search/search-article.effects';
import { KbViewEffects } from './article/article.effects';
import { KbSuggestedArticlesEffects } from './suggestedlist/suggested-article.effects';
import { IKbSuggestedState } from './suggestedlist/suggested-article.state';

export interface IKbState {
  kbSearch: IKbSearchState,
  kbView: IKbViewState,
  kbSuggested:IKbSuggestedState
}

export const reducers: ActionReducerMap<IKbState> = {
  kbSearch: kbSearchReducer,
  kbView: kbViewReducer,
  kbSuggested : kbSuggestedReducer
};

export const effects = [
  KbSearchEffects,
  KbViewEffects,
  KbSuggestedArticlesEffects
];

export const metaReducers: MetaReducer<IKbState>[] = [];