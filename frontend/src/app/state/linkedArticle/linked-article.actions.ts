import { Action } from '@ngrx/store';
import { IArticle } from '../../models/IArticle';

export enum ActionTypes {
  GetLinkedArticles = '[KB-LINKED-ARTICLE] GetLinkedArticles',
  GetLinkedArticlesSuccess = '[KB-LINKED-ARTICLE] GetLinkedArticlesSuccess',
  GetLinkedArticlesError = '[KB-LINKED-ARTICLE] GetLinkedArticlesError'
}

export class GetLinkedArticles implements Action {
  public readonly type = ActionTypes.GetLinkedArticles;
  constructor() { }
}

export class GetLinkedArticlesSuccess implements Action {
  public readonly type = ActionTypes.GetLinkedArticlesSuccess;
  constructor(public payload: { data: IArticle[] , totalCount: number }) { }
}

export class GetLinkedArticlesError implements Action {
  public readonly type = ActionTypes.GetLinkedArticlesError;
  constructor(public payload: { error: any }) { }
}

export type Actions = GetLinkedArticles
  | GetLinkedArticlesSuccess
  | GetLinkedArticlesError;