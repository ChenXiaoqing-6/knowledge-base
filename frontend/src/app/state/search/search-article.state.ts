import { EntityState } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { IPagination } from '../../models/IPagination';

export interface IKbSearchState extends EntityState<IArticle> {
    isLoading: boolean;
    pagination: IPagination;
    totalObjectCount: number;
}