import { IArticle } from "./IArticle";

export interface IArticleAction {
    title:  (article: IArticle) => string;
    icon: (article: IArticle) => string;
    handler: (article: IArticle) => void;
    childActions?: IArticleAction[];
}

export enum ARTICLE_ACTION_TYPE {
    COPY = 'COPY',
    MORE = 'MORE',
    DELETE = 'DELETE',
}