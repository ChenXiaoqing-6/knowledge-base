import { IArticle } from '../../models/IArticle';
import * as fromAction from './linked-article.actions';
import * as fromLinkedArticle from './linked-article.reducers';

describe("KbLinkedReducers", () => {

    it('should return the default state', () => {
        let initialState = fromLinkedArticle.initialKbLinkedArticleState;
        let currentState = fromLinkedArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        let action = {} as fromAction.Actions;
        expect(fromLinkedArticle.reducer(currentState, action)).toBe(currentState);
    });

    it('GetLinkedArticles', () => {
        let initialState = fromLinkedArticle.initialKbLinkedArticleState;
        let action = new fromAction.GetLinkedArticles();
        let currentState = fromLinkedArticle.reducer(initialState, action);
        let expectedState = {
            ...initialState,
            isLoading: true,
            isInit: true,
            isError: false
        };
        expect(currentState).toEqual(expectedState);
    });

   
    it('GetLinkedArticlesSuccess', () => {
        let initialState = fromLinkedArticle.initialKbLinkedArticleState;
        let payload = {
            data: [{ id: '5' }, { id: '6' }, { id: '7' }] as IArticle[],
            totalCount: 20
        };
        let action = new fromAction.GetLinkedArticlesSuccess(payload);
        let currentState = fromLinkedArticle.reducer(initialState, action);
        let expectedState = fromLinkedArticle.adapter.addAll(payload.data, {
            ...initialState,
            isLoading: false,
            totalObjectCount: payload.totalCount
        });
        expect(currentState).toEqual(expectedState);
    });

    it('GetLinkedArticlesError', () => {
        let initialState = fromLinkedArticle.initialKbLinkedArticleState;
        let action = new fromAction.GetLinkedArticlesError({ error: "error" });
        let currentState = fromLinkedArticle.reducer(initialState, action)
        expect(currentState).toEqual({
            ...initialState,
            isLoading: false,
            isError: true
        });
    });

});