import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/IArticle';
import { IKbState } from '../index';
import { GetLinkedArticles, InitLinkedArticles } from './linked-article.actions';
import {
    selectIsLoading,
    selectIsCompleted,
    selectAllArticles,
    selectTotalObjectCount
} from './linked-article.selectors';

@Injectable()
export class KbLinkedListFacade {

    constructor(private store$: Store<IKbState>) { }

    public getArticles(): Observable<IArticle[]> {
        return this.store$.pipe(select(selectAllArticles));
    }

    public getLinkedArticles() {
        this.store$.dispatch(new InitLinkedArticles());
        this.store$.dispatch(new GetLinkedArticles());
    }

    public getTotalObjectCount(): Observable<number> {
        return this.store$.pipe(select(selectTotalObjectCount));
    }

    public isCompleted(): Observable<boolean> {
        return this.store$.pipe(select(selectIsCompleted));
    }

    public isLinkingArticles(): Observable<boolean> {
        return this.store$.pipe(select(selectIsLoading));
    }

}
