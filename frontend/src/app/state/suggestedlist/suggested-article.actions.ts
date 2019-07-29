import { Action } from '@ngrx/store';
import { IArticle } from '../../models/IArticle';

export enum ActionTypes{
    SuggestedArticles = '[KB-ARTICLE-SUGGESTED] SuggestedArticles',
    SuggestedArticlesSuccess = '[KB-ARTICLE-SUGGESTED] SuggestedArticlesSuccess',
    SuggestedArticlesError = '[KB-ARTICLE-SUGGESTED] SuggestedSelectedError'
}

export class SuggestedArticles implements Action{
    public readonly type  = ActionTypes.SuggestedArticles;
    constructor(){}
}

export class SuggestedArticlesSuccess implements Action {
    public readonly type = ActionTypes.SuggestedArticlesSuccess;
    constructor(public payload: { data: IArticle[] ,totalCount:number }) { }
  }
  
  export class SuggestedArticlesError implements Action {
    public readonly type = ActionTypes.SuggestedArticlesError;
    constructor(public payload: { error: any }) { }
  }

  export type Actions = SuggestedArticles
  | SuggestedArticlesSuccess
  | SuggestedArticlesError
