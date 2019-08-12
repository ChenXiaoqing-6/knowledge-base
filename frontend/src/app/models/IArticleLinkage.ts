import { IArticle } from "./IArticle";

export interface IArticleLinkage {
    id: string;
    articleId: string;
    providerType?: string;
    objectRef: IArticleLinkageObjectRef,
}

export interface IArticleLinkageObjectRef {
    objectId: string;
    objectType: string; // TBD: string or enum
}

export interface IExtendArticleLinkage {
    article: IArticle,
    articleLinkage: IArticleLinkage
}