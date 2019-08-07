
import { reducer, initialKbState } from './article.reducers';
import { LoadIFrameContentSuccess, OpenArticle } from './article.actions';
import { Actions } from './article.actions';

describe('ArticleReducer', () => {
    it('should return the default state when the action undefined', () => {
        const action: Actions = {} as Actions;
        const state = reducer(undefined, action);
        expect(state).toBe(initialKbState);
    });

    it('should set isContentLoading to true and currentArticle to action payload when the action is OpenArticle', () => {
        const selectedArticleId = '100';
        const action = new OpenArticle(selectedArticleId);
        const state = reducer(undefined, action);
        expect(state.isContentLoading).toBe(true);
        expect(state.selectedArticleId).toBe(selectedArticleId);
    });

    it('should set isContentLoading to false when the action is LoadIFrameContentSuccess', () => {
        const action = new LoadIFrameContentSuccess();
        const state = reducer(undefined, action);
        expect(state.isContentLoading).toBe(false);
    });
});
