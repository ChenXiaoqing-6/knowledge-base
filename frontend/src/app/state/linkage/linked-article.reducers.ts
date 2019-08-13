import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { IArticleLinkage } from '../../models/IArticleLinkage';
import { IkbLinkedArticleState } from './linked-article.state';
import { Actions, ActionTypes } from './linked-article.actions';

export const adapter: EntityAdapter<IArticle> = createEntityAdapter<IArticle>();

export const initialKbLinkedArticleState: IkbLinkedArticleState = adapter.getInitialState({
    isInit: false,
    isLoading: false,
    isError: false,
    isLinkArticleError: false,
    isUnlinkArticleError: false,
    articleLinkages: []
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
            let linkedArticles: IArticle[] = [], articleLinkages: IArticleLinkage[] = [];
            action.payload.data.map(item => {
                item.article.isLinked = true;
                linkedArticles.push(item.article);
                articleLinkages.push(item.articleLinkage);
            });
            return adapter.addAll(linkedArticles, {
                ...state,
                isLoading: false,
                articleLinkages: articleLinkages,
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