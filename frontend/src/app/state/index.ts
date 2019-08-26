import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reducer as kbSearchReducer } from './search/search-article.reducers';
import { reducer as kbViewReducer } from './article/article.reducers';
import { reducer as kbLinkedArticleReducer } from './linkage/linked-article.reducers';
import { reducer as kbSuggestedArticleReducer } from './suggestion/suggested-article.reducers';
import { reducer as kbConfigReducer } from './config/config.reducers';
import { IKbSearchState } from './search/search-article.state';
import { IKbViewState} from './article/article.state';
import { IkbLinkedArticleState } from './linkage/linked-article.state';
import { IKbSuggestedState } from './suggestion/suggested-article.state';
import { IkbConfigState } from './config/config.state';
import { KbSearchEffects } from './search/search-article.effects';
import { KbViewEffects } from './article/article.effects';
import { KbLinkedArticlesEffects } from './linkage/linked-article.effects';
import { KbSuggestedArticlesEffects } from './suggestion/suggested-article.effects';
import { KbConfigEffects } from './config/config.effects';

export interface IKbState {
  kbSearch: IKbSearchState,
  kbView: IKbViewState,
  kbLinkedArticle: IkbLinkedArticleState,
  kbSuggested: IKbSuggestedState,
  kbConfig: IkbConfigState
}

export const reducers: ActionReducerMap<IKbState> = {
  kbSearch: kbSearchReducer,
  kbView: kbViewReducer,
  kbLinkedArticle: kbLinkedArticleReducer,
  kbSuggested: kbSuggestedArticleReducer,
  kbConfig: kbConfigReducer
};

export const effects = [
  KbSearchEffects,
  KbViewEffects,
  KbLinkedArticlesEffects,
  KbSuggestedArticlesEffects,
  KbConfigEffects
];

export const metaReducers: MetaReducer<IKbState>[] = [];