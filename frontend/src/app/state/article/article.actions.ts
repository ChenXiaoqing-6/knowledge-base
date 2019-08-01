import { Action } from '@ngrx/store';

export enum ActionTypes {
  OpenArticle = '[KB-ARTICLE-OPEN] OpenArticle',
  BackArticle = '[KB-ARTICLE-OPEN] BackArticle',
  LoadIFrameContentSuccess = '[KB-ARTICLE-OPEN] LoadIFrameContentSuccess',
}

export class OpenArticle implements Action {
  public readonly type = ActionTypes.OpenArticle;
  constructor(public payload: string) { }
}

export class BackArticle implements Action {
  public readonly type = ActionTypes.BackArticle;
}

export class LoadIFrameContentSuccess implements Action {
  public readonly type = ActionTypes.LoadIFrameContentSuccess;
}

export type Actions = OpenArticle
  | BackArticle
  | LoadIFrameContentSuccess