import { IArticle } from "./IArticle";

export interface IArticleAction {
    title: string;
    icon: string;
    handler: (article: IArticle) => void;
}

export enum ARTICLE_ACTION_TYPE {
    COPY = 'COPY',
    MORE = 'MORE',
    DELETE = 'DELETE',
}