import { Action } from '@ngrx/store';
import { IArticle } from '../../models/IArticle';
import { ISearchOptions } from '../../models/IRequestOptions';

export enum ActionTypes {
  SearchArticles = '[KB-ARTICLE-SEARCH] SearchArticles',
  SearchArticlesSuccess = '[KB-ARTICLE-SEARCH] SearchArticlesSuccess',
  SearchArticlesError = '[KB-ARTICLE-SEARCH] UpdateSelectedError',
  SearchArticlesReset = '[KB-ARTICLE-SEARCH] SearchArticlesReset'
}

export class SearchArticles implements Action {
  public readonly type = ActionTypes.SearchArticles;
  constructor(public payload: ISearchOptions) { }
}

export class SearchArticlesSuccess implements Action {
  public readonly type = ActionTypes.SearchArticlesSuccess;
  constructor(public payload: { data: IArticle[] , totalCount: number }) { }
}

export class SearchArticlesError implements Action {
  public readonly type = ActionTypes.SearchArticlesError;
  constructor(public payload: { error: any }) { }
}

export class SearchArticlesReset implements Action {
  public readonly type = ActionTypes.SearchArticlesReset;
}

export type Actions = SearchArticles
  | SearchArticlesSuccess
  | SearchArticlesError
  | SearchArticlesReset;