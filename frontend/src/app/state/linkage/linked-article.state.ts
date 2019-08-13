import { EntityState } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { IArticleLinkage } from '../../models/IArticleLinkage';

export interface IkbLinkedArticleState extends EntityState<IArticle> {
    isInit: boolean;
    isLoading: boolean;
    isError: boolean;
    isLinkArticleError: boolean,
    isUnlinkArticleError: boolean,
    articleLinkages: IArticleLinkage[],
}