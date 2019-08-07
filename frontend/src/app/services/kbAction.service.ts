import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { AlertService } from 'fundamental-ngx';
import { ARTICLE_ACTION_TYPE, IArticleAction } from '../models/IArticleAction';
import { IArticle } from '../models/IArticle';

@Injectable()
export class KbActionService {

    private defaultActions: Map<ARTICLE_ACTION_TYPE, IArticleAction> = new Map();

    constructor(private alertService: AlertService, private translateService: TranslateService) {
        this.defaultActions = this.setDefaultActions();
    }

    public getAction(type: ARTICLE_ACTION_TYPE, customHandler?: (article: IArticle) => void): IArticleAction | undefined {
        const action = this.defaultActions.get(type);
        if (action && customHandler) {
            const mergeHandler = (article: IArticle) => {
                action.handler(article);
                customHandler(article);
            };
            return { ...action, handler: mergeHandler };
        }
        return action;
    }

    private setDefaultActions(): Map<ARTICLE_ACTION_TYPE, IArticleAction> {
        const emptyHandler = (article: IArticle) => { };
        const defaultActions: Map<ARTICLE_ACTION_TYPE, IArticleAction> = new Map();
        defaultActions.set(ARTICLE_ACTION_TYPE.COPY, {
            title: this.translateService.instant('KB_ARTICLE_ACTIONS_COPY_TITLE'),
            icon: 'sap-icon--copy',
            handler: (article: IArticle) => {
                this.handleCopyArticleLink(article);
            }
        }).set(ARTICLE_ACTION_TYPE.MORE, {
            title: this.translateService.instant('KB_ARTICLE_ACTIONS_MORE_TITLE'),
            icon: 'sap-icon--overflow',
            handler: emptyHandler
        }).set(ARTICLE_ACTION_TYPE.DELETE, {
            title: this.translateService.instant('KB_ARTICLE_ACTIONS_REMOVE_TITLE'),
            icon: 'sap-icon--delete',
            handler: emptyHandler
        });
        return defaultActions;
    }

    private handleCopyArticleLink(article: IArticle) {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            let textarea = document.createElement('textarea');
            textarea.textContent = article.link;
            textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy'); // Security exception may be thrown by some browsers.
                this.alertService.open(this.translateService.instant('KB_ARTICLE_ACTIONS_COPY_MESSGAE_TOAST'), {
                    type: 'information',
                    dismissible: false,
                    duration: 3000
                });
            } catch (ex) {
                console.log(ex);
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }
}