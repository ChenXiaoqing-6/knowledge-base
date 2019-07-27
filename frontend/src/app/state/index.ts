import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reducer as kbSearchReducer } from './search/search-article.reducers';
import { reducer as kbViewReducer } from './article/article.reducers';
import { reducer as kbLinkedArticleReducer } from './linkedArticle/linked-article.reducers';
import { reducer as kbSuggestedArticleReducer } from './suggestedList/suggested-article.reducers';
import { IKbSearchState } from './search/search-article.state';
import { IKbViewState} from './article/article.state';
import { IkbLinkedArticleState } from './linkedArticle/linked-article.state';
import { IKbSuggestedState } from './suggestedList/suggested-article.state';
import { KbSearchEffects } from './search/search-article.effects';
import { KbViewEffects } from './article/article.effects';
import { KbLinkedArticlesEffects } from './linkedArticle/linked-article.effects';
import { KbSuggestedArticlesEffects } from './suggestedList/suggested-article.effects';

export interface IKbState {
  kbSearch: IKbSearchState,
  kbView: IKbViewState,
  kbLinkedArticle: IkbLinkedArticleState,
  kbSuggested: IKbSuggestedState
}

export const reducers: ActionReducerMap<IKbState> = {
  kbSearch: kbSearchReducer,
  kbView: kbViewReducer,
  kbLinkedArticle: kbLinkedArticleReducer,
  kbSuggested: kbSuggestedArticleReducer
};

export const effects = [
  KbSearchEffects,
  KbViewEffects,
  KbLinkedArticlesEffects,
  KbSuggestedArticlesEffects
];

export const metaReducers: MetaReducer<IKbState>[] = [];