import { Action } from '@ngrx/store';
import { IArticleLinkage, IExtendArticleLinkage, IArticleLinkageOptions } from '../../models/IArticleLinkage';

export enum ActionTypes {
  GetLinkedArticles = '[KB-LINKED-ARTICLE] GetLinkedArticles',
  GetLinkedArticlesSuccess = '[KB-LINKED-ARTICLE] GetLinkedArticlesSuccess',
  GetLinkedArticlesError = '[KB-LINKED-ARTICLE] GetLinkedArticlesError',
  LinkArticle = '[KB-LINKED-ARTICLE] LinkArticle',
  LinkArticleSuccess = '[KB-LINKED-ARTICLE] LinkArticleSuccess',
  LinkArticleError = '[KB-LINKED-ARTICLE] LinkArticleError',
  UnlinkArticle = '[KB-LINKED-ARTICLE] UnlinkArticle',
  UnlinkArticleSuccess = '[KB-LINKED-ARTICLE] UnlinkArticleSuccess',
  UnlinkArticleError = '[KB-LINKED-ARTICLE] UnlinkArticleError',
}

export class GetLinkedArticles implements Action {
  public readonly type = ActionTypes.GetLinkedArticles;
  constructor(public payload: IArticleLinkageOptions) { }
}

export class GetLinkedArticlesSuccess implements Action {
  public readonly type = ActionTypes.GetLinkedArticlesSuccess;
  constructor(public payload: { data: IExtendArticleLinkage[] , totalCount: number }) { }
}

export class GetLinkedArticlesError implements Action {
  public readonly type = ActionTypes.GetLinkedArticlesError;
  constructor(public payload: { error: any }) { }
}

export class LinkArticle implements Action {
  public readonly type = ActionTypes.LinkArticle;
  constructor(public payload: IExtendArticleLinkage) { }
}

export class LinkArticleSuccess implements Action {
  public readonly type = ActionTypes.LinkArticleSuccess;
  constructor(public payload: IExtendArticleLinkage) { }  
}

export class LinkArticleError implements Action {
  public readonly type = ActionTypes.LinkArticleError;
  constructor(public payload: { error: any }) { }
}

export class UnlinkArticle implements Action {
  public readonly type = ActionTypes.UnlinkArticle;
  constructor(public payload: IArticleLinkage ) { }
}

export class UnlinkArticleSuccess implements Action {
  public readonly type = ActionTypes.UnlinkArticleSuccess;
  constructor(public payload: { articleLinkage: IArticleLinkage} ) { }
}

export class UnlinkArticleError implements Action {
  public readonly type = ActionTypes.UnlinkArticleError;
  constructor(public payload: { error: any }) { }
}

export type Actions = GetLinkedArticles
  | GetLinkedArticlesSuccess
  | GetLinkedArticlesError
  | LinkArticle
  | LinkArticleSuccess
  | LinkArticleError
  | UnlinkArticle
  | UnlinkArticleSuccess
  | UnlinkArticleError;