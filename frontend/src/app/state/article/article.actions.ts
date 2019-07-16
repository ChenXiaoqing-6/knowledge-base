import { Action } from '@ngrx/store';
import { IArticle } from '../../models/IArticle';

export enum ActionTypes {
  OpenArticle = '[KB-ARTICLE-OPEN] OpenArticle',
  CloseArticle = '[KB-ARTICLE-OPEN] CloseArticle',
  OpenArticleError = '[KB-ARTICLE-OPEN] OpenArticleError',
  LoadIFrameContentSuccess = '[KB-ARTICLE-OPEN] LoadIFrameContentSuccess',
}

export class OpenArticle implements Action {
  public readonly type = ActionTypes.OpenArticle;
  constructor(public payload: IArticle) { }
}

export class CloseArticle implements Action {
  public readonly type = ActionTypes.CloseArticle;
}

export class OpenArticleError implements Action {
  public readonly type = ActionTypes.OpenArticleError;
  constructor(public payload: string) { }
}

export class LoadIFrameContentSuccess implements Action {
  public readonly type = ActionTypes.LoadIFrameContentSuccess;
}

export type Actions = OpenArticle | CloseArticle | OpenArticleError | LoadIFrameContentSuccess;