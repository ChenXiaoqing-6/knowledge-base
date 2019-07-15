import { EntityState } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { IPagination } from '../../models/IPagination';

export interface IKbSearchState extends EntityState<IArticle> {
    isInit: boolean;
    isLoading: boolean;
    searchTerm: string;
    pagination: IPagination;
    totalObjectCount: number;
}