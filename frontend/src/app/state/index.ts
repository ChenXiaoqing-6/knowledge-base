import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reducer as kbSearchReducer } from './search/search-article.reducers';
import { reducer as kbViewReducer } from './article/article.reducers';
import { reducer as kbLinkedArticleReducer } from './linkedArticle/linked-article.reducers';
import { IKbSearchState } from './search/search-article.state';
import { IKbViewState} from './article/article.state';
import { IkbLinkedArticleState } from './linkedArticle/linked-article.state';
import { KbSearchEffects } from './search/search-article.effects';
import { KbViewEffects } from './article/article.effects';
import { KbLinkedArticlesEffects } from './linkedArticle/linked-article.effects';

export interface IKbState {
  kbSearch: IKbSearchState,
  kbView: IKbViewState,
  kbLinkedArticle: IkbLinkedArticleState
}

export const reducers: ActionReducerMap<IKbState> = {
  kbSearch: kbSearchReducer,
  kbView: kbViewReducer,
  kbLinkedArticle: kbLinkedArticleReducer
};

export const effects = [
  KbSearchEffects,
  KbViewEffects,
  KbLinkedArticlesEffects
];

export const metaReducers: MetaReducer<IKbState>[] = [];