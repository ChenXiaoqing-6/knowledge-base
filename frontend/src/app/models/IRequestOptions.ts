import {IPagination} from '../models/IPagination';

export interface IPaginationOptions {
    pagination: IPagination
}

export interface ISearchOptions extends IPaginationOptions {
    searchTerm: string
}
