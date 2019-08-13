import { IArticle } from "./IArticle";
import {IPagination} from '../models/IPagination';

export interface IArticleLinkage {
    id?: string;
    articleId: string;
    providerType?: string;
    objectRef: IArticleLinkageObjectRef,
}

export interface IArticleLinkageObjectRef {
    objectId: string;
    objectType: string; 
}

export interface IExtendArticleLinkage {
    article: IArticle,
    articleLinkage: IArticleLinkage
}

export interface IPaginationOptions {
    pagination: IPagination
}

export interface ILinkageObjectRefOptions {
    objectRef: IArticleLinkageObjectRef
}

export interface IArticleLinkageOptions extends IPaginationOptions, ILinkageObjectRefOptions {

}
