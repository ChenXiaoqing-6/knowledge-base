import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'fundamental-ngx';
import { ARTICLE_ACTION_TYPE, IArticleAction } from '../models/IArticleAction';
import { IArticle } from '../models/IArticle';
import { KbLinkedListFacade } from '../state/linkage/linked-article.facade';

@Injectable()
export class KbActionService {

    private defaultActions: Map<ARTICLE_ACTION_TYPE, IArticleAction> = new Map();

    constructor(private alertService: AlertService, private translateService: TranslateService, private kbLinkageFacade: KbLinkedListFacade) {
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
            title: () => this.translateService.instant('KB_ARTICLE_ACTIONS_COPY_TITLE'),
            icon: () => 'sap-icon--copy',
            handler: (article: IArticle) => {
                this.handleCopyArticleLink(article);
            }
        }).set(ARTICLE_ACTION_TYPE.MORE, {
            title: () => this.translateService.instant('KB_ARTICLE_ACTIONS_MORE_TITLE'),
            icon: () => 'sap-icon--overflow',
            handler: emptyHandler,
            childActions: [
                {
                    title: (article: IArticle) => {
                       return article.isLinked ? this.translateService.instant('KB_ARTICLE_ACTIONS_UNLINK_CASE') : this.translateService.instant('KB_ARTICLE_ACTIONS_LINK_CASE');
                    },
                    icon: (article: IArticle) => {
                        return article.isLinked ? 'sap-icon--broken-link' : 'sap-icon--chain-link';
                    },
                    handler: (article: IArticle) => {
                        if (article.isLinked) {
                            this.kbLinkageFacade.unlinkArticle({ articleId: article.id, objectRef: 'test' });
                        } else {
                            this.kbLinkageFacade.linkArticle({ article: article, articleLinkage: { articleId: article.id, objectRef: 'test' }});
                        }
                    }
                }
            ]
        }).set(ARTICLE_ACTION_TYPE.DELETE, {
            title: () => this.translateService.instant('KB_ARTICLE_ACTIONS_REMOVE_TITLE'),
            icon: () => 'sap-icon--delete',
            handler: (article: IArticle) => {
                this.kbLinkageFacade.unlinkArticle({ articleId: article.id, objectRef: 'test' });
            }
        });
        return defaultActions;
    }

    private handleCopyArticleLink(article: IArticle) {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            let textarea = document.createElement('textarea');
            textarea.textContent = article.link;
            textarea.style.position = 'fixed'; 
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
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