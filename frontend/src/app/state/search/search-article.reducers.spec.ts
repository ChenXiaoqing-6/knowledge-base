import { ISearchOptions } from './../../models/IRequestOptions';
import { IArticle } from '../../models/IArticle';
import { Helper as PaginationHelper } from '../../models/IPagination';
import * as fromAction from './search-article.actions';
import * as fromSearchArticle from './search-article.reducers';

describe("KbSearchReducers", () => {

    it('should return the default state', () => {
        let initialState = fromSearchArticle.initialKbSearchState;
        let currentState = fromSearchArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        let action = {} as fromAction.Actions;
        expect(fromSearchArticle.reducer(currentState, action)).toBe(currentState);
    });

    it('SearchArticles for initial search: pageIndex == 1', () => {
        let initialState = fromSearchArticle.initialKbSearchState;
        let currentState = fromSearchArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        let payload = {
            searchTerm: "searchKeywords",
            pagination: {
                pageSize: 20,
                pageIndex: 1
            }
        };
        let action = new fromAction.SearchArticles(payload);
        currentState = fromSearchArticle.reducer(currentState, action);
        let expectedState = {
            ...initialState,
            isLoading: true,
            isInit: false,
            isError: false,
            searchTerm: payload.searchTerm,
            pagination: payload.pagination,
            lastPage: 1,
            totalObjectCount: 0
        };
        expect(currentState).toEqual(expectedState);
    });

    it('SearchArticles for delta search: pageIndex != 1', () => {
        let initialState = fromSearchArticle.initialKbSearchState;
        let currentState = fromSearchArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        let payload = {
            pagination: {
                pageIndex: 4
            }
        } as ISearchOptions;
        let action = new fromAction.SearchArticles(payload);
        expect(fromSearchArticle.reducer(currentState, action)).toEqual({
            ...currentState,
            isLoading: true,
            isError: false
        });
    });

    it('SearchArticlesSuccess for clearState = true', () => {
        let initialState = fromSearchArticle.initialKbSearchState;
        let currentState = fromSearchArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        let payload = {
            data: [{ id: '5' }, { id: '6' }, { id: '7' }] as IArticle[],
            pagination: PaginationHelper.create(),
            lastPage: 1,
            totalCount: 20
        };
        let action = new fromAction.SearchArticlesSuccess(payload, true);
        currentState = fromSearchArticle.reducer(currentState, action)
        let expectedState = fromSearchArticle.adapter.addAll(payload.data, {
            ...initialState,
            isLoading: false,
            pagination: payload.pagination,
            lastPage: payload.lastPage,
            totalObjectCount: payload.totalCount
        });
        expect(currentState).toEqual(expectedState);
    });


    it('SearchArticlesSuccess for clearState = false', () => {
        let initialState = fromSearchArticle.initialKbSearchState;
        let currentState = fromSearchArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        let payload = {
            data: [{ id: '5' }, { id: '6' }, { id: '7' }] as IArticle[],
            pagination: PaginationHelper.create(),
            lastPage: 1,
            totalCount: 20
        };
        let action = new fromAction.SearchArticlesSuccess(payload, false);
        currentState = fromSearchArticle.reducer(currentState, action)
        let expectedState = fromSearchArticle.adapter.addMany(payload.data, {
            ...currentState,
            isLoading: false,
            pagination: payload.pagination,
            lastPage: payload.lastPage,
            totalObjectCount: payload.totalCount
        });
        expect(currentState).toEqual(expectedState);
    });

    it('SearchArticlesError', () => {
        let initialState = fromSearchArticle.initialKbSearchState;
        let currentState = fromSearchArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        let action = new fromAction.SearchArticlesError({ error: "error" });
        currentState = fromSearchArticle.reducer(currentState, action)
        expect(currentState).toEqual({
            ...currentState,
            isLoading: false,
            isError: true
        });
    });

    it('SearchArticlesReset', () => {
        let initialState = fromSearchArticle.initialKbSearchState;
        let currentState = fromSearchArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        let action = new fromAction.SearchArticlesReset();
        currentState = fromSearchArticle.reducer(currentState, action)
        expect(currentState).toEqual(initialState);
    });
});