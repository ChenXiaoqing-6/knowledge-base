import { EntityState } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';

export interface IkbLinkedArticleState extends EntityState<IArticle> {
    isInit: boolean;
    isLoading: boolean;
    isError: boolean;
    totalObjectCount: number;
}