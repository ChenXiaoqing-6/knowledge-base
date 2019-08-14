import { IArticle } from '../../models/IArticle';
import { IExtendArticleLinkage, IArticleLinkage } from '../../models/IArticleLinkage';
import { MockLinkedArticlesResponse } from '../../services/mock/mock-data';
import * as fromAction from './linked-article.actions';
import * as fromLinkedArticle from './linked-article.reducers';
import { Helper as PaginationHelper } from '../../models/IPagination';

describe("KbLinkedReducers", () => {

    it('should return the default state', () => {
        const initialState = fromLinkedArticle.initialKbLinkedArticleState;
        const currentState = fromLinkedArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        const action = {} as fromAction.Actions;
        expect(fromLinkedArticle.reducer(currentState, action)).toBe(currentState);
    });

    it('GetLinkedArticles', () => {
        const initialState = fromLinkedArticle.initialKbLinkedArticleState;
        const articleLinkageOption = {
            pagination: PaginationHelper.createLinkagePagination(),
            objectRef: { objectId: 'test', objectType: 'CASE' }
        };
        const action = new fromAction.GetLinkedArticles(articleLinkageOption);
        const currentState = fromLinkedArticle.reducer(initialState, action);
        const expectedState = {
            ...initialState,
            isLoading: true,
            isInit: true,
            isError: false
        };
        expect(currentState).toEqual(expectedState);
    });

   
    it('GetLinkedArticlesSuccess', () => {
        const initialState = fromLinkedArticle.initialKbLinkedArticleState;
        const payload = {
            data:  MockLinkedArticlesResponse.data as IExtendArticleLinkage[],
            totalCount: 20
        };
        const action = new fromAction.GetLinkedArticlesSuccess(payload);
        const currentState = fromLinkedArticle.reducer(initialState, action);
        let articles: IArticle[] = [], articleLinkages: IArticleLinkage[] = [];
        MockLinkedArticlesResponse.data.map(item => {
            item.article.isLinked = true;
            articles.push(item.article);
            articleLinkages.push(item.articleLinkage);
        });
        const expectedState = fromLinkedArticle.adapter.addAll(articles, {
            ...initialState,
            isLoading: false,
            totalObjectCount: payload.totalCount,
            articleLinkages: articleLinkages
        });
        expect(currentState).toEqual(expectedState);
    });

    it('GetLinkedArticlesError', () => {
        const initialState = fromLinkedArticle.initialKbLinkedArticleState;
        const action = new fromAction.GetLinkedArticlesError({ error: "error" });
        const currentState = fromLinkedArticle.reducer(initialState, action)
        expect(currentState).toEqual({
            ...initialState,
            isLoading: false,
            isError: true
        });
    });

});
