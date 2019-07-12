import { Action } from '@ngrx/store';
import { IArticle } from '../../models/IArticle';

export enum ActionTypes {
  OpenArticle = '[KB-ARTICLE-OPEN] OpenArticle'
}

export class OpenArticle implements Action {
  public readonly type = ActionTypes.OpenArticle;
  constructor(public payload: IArticle) { }
}

export type Actions = OpenArticle;