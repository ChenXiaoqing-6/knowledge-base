import * as fromAction from './suggested-article.actions';
import * as fromSuggestedArticle from './suggested-article.reducers';
import { IArticle } from '../../models/IArticle';
import { ISearchOptions } from '../../models/IRequestOptions';

describe("KbSuggestedReducers", () => {

    let currentState, initialState;

    beforeEach(() => {
        initialState = fromSuggestedArticle.initialKbSuggestedState;
        currentState = fromSuggestedArticle.adapter.addMany([{ id: '1' }, { id: '2' }] as IArticle[], initialState);
        //?????
    })

    it('should return the default state', () => {
        let action = {} as fromAction.Actions;//???Actions???
        expect(fromSuggestedArticle.reducer(currentState, action)).toBe(currentState);
    });

    it('InitSuggestedArticles should return the default state', () => {
        let action = new fromAction.InitSuggestedArticles();
        currentState = fromSuggestedArticle.reducer(currentState, action);
        expect(currentState).toEqual(initialState);
    });

    it('SuggestedArticles should return the expected state', () => {
        //??????????????
        let payload = {} as ISearchOptions;
        let action = new fromAction.SuggestedArticles(payload);
        currentState = fromSuggestedArticle.reducer(currentState, action);
        let expectedState = {
            ...currentState,
            isLoading: true
        }
        expect(currentState).toEqual(expectedState);
    });

    it('SuggestedArticlesSuccess should return the expected state', () => {
        let payload = {
            data: [{ id: '1' }, { id: '2' }] as IArticle[],
            totalCount: 2
        };
        let action = new fromAction.SuggestedArticlesSuccess(payload);
        currentState = fromSuggestedArticle.reducer(currentState, action);
        let expectedState = fromSuggestedArticle.adapter.addAll(payload.data, {
            ...initialState,
            isCompleted: true,
            isLoading: false,
            totalObjectCount: 2
        });
        expect(currentState).toEqual(expectedState);
    });

    it('SuggestedArticlesError should return the expected state', () => {
        let action = new fromAction.SuggestedArticlesError({ error: "error" });
        currentState = fromSuggestedArticle.reducer(currentState, action);
        expect(currentState).toEqual({
            ...currentState,
            isCompleted: true,
            isLoading: false
        });
    });

});