import { Action } from '@ngrx/store';
import { IArticle } from '../../models/IArticle';

export enum ActionTypes {
  OpenArticle = '[KB-ARTICLE-OPEN] OpenArticle',
  LoadIFrameContentSuccess = '[KB-ARTICLE-OPEN] LoadIFrameContentSuccess',
}

export class OpenArticle implements Action {
  public readonly type = ActionTypes.OpenArticle;
  constructor(public payload: IArticle) { }
}

export class LoadIFrameContentSuccess implements Action {
  public readonly type = ActionTypes.LoadIFrameContentSuccess;
}

export type Actions = OpenArticle | LoadIFrameContentSuccess;