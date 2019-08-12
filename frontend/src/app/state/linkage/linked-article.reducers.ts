import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { IkbLinkedArticleState } from './linked-article.state';
import { Actions, ActionTypes } from './linked-article.actions';
import { IExtendArticleLinkage } from '../../models/IArticleLinkage';

export const adapter: EntityAdapter<IExtendArticleLinkage> = createEntityAdapter<IExtendArticleLinkage>();

export const initialKbLinkedArticleState: IkbLinkedArticleState = adapter.getInitialState({
    isInit: false,
    isLoading: false,
    isError: false,
    isLinkArticleError: false,
    isUnlinkArticleError: false,
});

export function reducer(state = initialKbLinkedArticleState, action: Actions): IkbLinkedArticleState {

    switch (action.type) {

        case ActionTypes.GetLinkedArticles:
            return {
                ...initialKbLinkedArticleState,
                isLoading: true,
                isInit: true,
                isError: false
            };

        case ActionTypes.GetLinkedArticlesSuccess:
            const linkedArticles: IArticle[] = Object.assign([], action.payload.data);
            linkedArticles.map((item) => item.isLinked = true);
            return adapter.addAll(linkedArticles, {
                ...state,
                isLoading: false,
                totalObjectCount: action.payload.totalCount
            });

        case ActionTypes.GetLinkedArticlesError:
            return { ...state, isLoading: false, isError: true };

        case ActionTypes.LinkArticleSuccess:
            const linkedArticle = Object.assign({}, action.payload.article);
            linkedArticle.isLinked = true;
            return adapter.addOne(linkedArticle, state);
        
        case ActionTypes.LinkArticleError:
            return { ...state, isLinkArticleError: true };

        case ActionTypes.UnlinkArticleSuccess:
            return adapter.removeOne(action.payload.articleLinkage.articleId, state);

        case ActionTypes.UnlinkArticleError:
            return { ...state, isUnlinkArticleError: true };

        default: {
            return state;
        }

    }
}

export const {
    selectAll,
    selectTotal
} = adapter.getSelectors();