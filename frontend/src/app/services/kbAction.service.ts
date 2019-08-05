import { ARTICLE_ACTION_TYPE, IArticleAction } from '../models/IArticleAction';
import { IArticle } from '../models/IArticle';
import { copyToClipBoard } from '../util/copyHelper';
import { Injectable } from '@angular/core';

@Injectable()
export class KbActionService {
    constructor(){
    
    }

    public getAction(type: ARTICLE_ACTION_TYPE, customHandler?: (article: IArticle) => void): IArticleAction | undefined {
        const action = defaultActions.get(type);

        if (action && customHandler) {
            const mergeHandler = (article: IArticle) => {
                action.handler(article);
                customHandler(article);
            };
            return { ...action, handler: mergeHandler };
        }
        return action;
    };
}

const emptyHandler = (article: IArticle) => { };
const defaultActions: Map<ARTICLE_ACTION_TYPE, IArticleAction> = new Map();
defaultActions.set(ARTICLE_ACTION_TYPE.COPY, {
    title: 'Copy',
    icon: 'sap-icon--copy',
    handler: (article: IArticle) => {
        copyToClipBoard(article);
        console.log('alert copy');
    }
}).set(ARTICLE_ACTION_TYPE.MORE, {
    title: 'More',
    icon: 'sap-icon--overflow',
    handler: emptyHandler
}).set(ARTICLE_ACTION_TYPE.DELETE, {
    title: 'Delete',
    icon: 'sap-icon--delete',
    handler: emptyHandler
});