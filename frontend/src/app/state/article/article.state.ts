import { IArticle } from './../../models/IArticle';

export interface IKbViewState {
    currentArticle: IArticle;
    isContentLoading: boolean;
    isArticleLoading: boolean;
}