import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { IkbLinkedArticleState } from './linked-article.state';
import { Actions, ActionTypes } from './linked-article.actions';

export const adapter: EntityAdapter<IArticle> = createEntityAdapter<IArticle>();

export const initialKbLinkedArticleState: IkbLinkedArticleState = adapter.getInitialState({
    isCompleted: false,
    isLoading: false,
    isError: false,
    totalObjectCount: 0
});

export function reducer(state = initialKbLinkedArticleState, action: Actions): IkbLinkedArticleState {

    switch (action.type) {

        case ActionTypes.InitLinkedArticles:
            return { ...initialKbLinkedArticleState };

        case ActionTypes.GetLinkedArticles:
            return {
                ...state,
                isLoading: true,
                isCompleted: false,
                isError: false
            };

        case ActionTypes.GetLinkedArticlesSuccess:
            return adapter.addAll(action.payload.data, {
                ...state,
                isCompleted: true,
                isLoading: false,
                totalObjectCount: action.payload.totalCount
            });

        case ActionTypes.GetLinkedArticlesError:

            return { ...state, isCompleted: true, isLoading: false, isError: true };

        default: {

            return state;
        }

    }
}

export const {
    selectAll
} = adapter.getSelectors();