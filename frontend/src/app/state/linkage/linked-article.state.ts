import { EntityState } from '@ngrx/entity';
import { IExtendArticleLinkage } from '../../models/IArticleLinkage';

export interface IkbLinkedArticleState extends EntityState<IExtendArticleLinkage> {
    isInit: boolean;
    isLoading: boolean;
    isError: boolean;
    isLinkArticleError: boolean,
    isUnlinkArticleError: boolean,
}