import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IKbState } from '../index';
import { 
    GetLinkedArticles, 
    LinkArticle, 
    UnlinkArticle 
} from './linked-article.actions';
import {
    selectIsLoading,
    selectIsInit,
    selectAllArticles,
    selectIsError,
    selectTotalObjectCount,
} from './linked-article.selectors';
import { IArticleLinkage, IExtendArticleLinkage, IArticleLinkageOptions } from '../../models/IArticleLinkage';
import { IArticle } from '../../models/IArticle';

@Injectable()
export class KbLinkedListFacade {

    constructor(private store$: Store<IKbState>) { }

    public getArticles(): Observable<IArticle[]> {
        return this.store$.pipe(select(selectAllArticles));
    }

    public getLinkedArticles(linkageOption: IArticleLinkageOptions) {
        this.store$.dispatch(new GetLinkedArticles(linkageOption));
    }

    public getTotalObjectCount(): Observable<number> {
        return this.store$.pipe(select(selectTotalObjectCount));
    }

    public isInit(): Observable<boolean> {
        return this.store$.pipe(select(selectIsInit));
    }

    public isLinkingArticles(): Observable<boolean> {
        return this.store$.pipe(select(selectIsLoading));
    }

    public isError(): Observable<boolean> {
        return this.store$.pipe(select(selectIsError));
    }

    public linkArticle(extendArticleLinkage: IExtendArticleLinkage) {
        this.store$.dispatch(new LinkArticle(extendArticleLinkage));
    }

    public unlinkArticle(articleLinkage: IArticleLinkage) {
        this.store$.dispatch(new UnlinkArticle(articleLinkage));
    }

}
