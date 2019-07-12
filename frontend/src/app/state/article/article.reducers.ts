import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { IArticle } from '../../models/IArticle';
import { RenderType } from '../../models/RenderType.enum';
import { IKbViewState, } from './article.state';
import { Actions, ActionTypes } from './article.actions';


export const adapter: EntityAdapter<IArticle> = createEntityAdapter<IArticle>();

export const initialKbState: IKbViewState = adapter.getInitialState({
    currentArticle: {
        id: '',
        provider: '',
        title: '',
        lastUpdated: new Date(),
        score: 0,
        link: '',
        renderType: RenderType.IFRAME,
        renderValue: '',
        views: 0,
        author: ''
    },
    isContentLoading: false,
    isArticleLoading: false
});

export function reducer(state = initialKbState, action: Actions): IKbViewState {

    switch (action.type) {
        case ActionTypes.OpenArticle:
            return { ...state, isContentLoading: true, currentArticle: action.payload };

        case ActionTypes.LoadIFrameContentSuccess:
            return { ...state, isContentLoading: false};

        default: {
            return state;
        }

    }
}

export const {
    selectAll
} = adapter.getSelectors();