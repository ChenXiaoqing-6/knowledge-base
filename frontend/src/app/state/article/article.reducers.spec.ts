
import { reducer, initialKbState } from './article.reducers';
import { LoadIFrameContentSuccess, OpenArticle } from './article.actions';
import { MockArticle } from '../../models/mock/Article.mock';
import { Actions } from './article.actions';

describe('ArticleReducer', () => {
    it('should return the default state when the action undefined', () => {
        const action: Actions = {} as Actions;
        const state = reducer(undefined, action);
        expect(state).toBe(initialKbState);
    });

    it('should set isContentLoading to true and currentArticle to action payload when the action is OpenArticle', () => {
        const action = new OpenArticle(MockArticle);
        const state = reducer(undefined, action);
        expect(state.isContentLoading).toBe(true);
        expect(state.currentArticle).toBe(MockArticle);
    });

    it('should set isContentLoading to false when the action is LoadIFrameContentSuccess', () => {
        const action = new LoadIFrameContentSuccess();
        const state = reducer(undefined, action);
        expect(state.isContentLoading).toBe(false);
    });
});
