import { EntityState } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { IPagination } from '../../models/IPagination';

export interface IKbSearchState extends EntityState<IArticle> {
    isInit: boolean;
    isLoading: boolean;
    isError: boolean;
    searchTerm: string;
    pagination: IPagination;
    lastPage: number;
    totalObjectCount: number;
}