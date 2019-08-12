import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { combineLatest } from 'rxjs/operators';
import { IKbState } from "../index";
import { Observable } from "rxjs";
import { IArticle } from "../../models/IArticle";
import { SuggestedArticles } from './suggested-article.actions';
import {
    selectAllArticles,
    selectTotalObjectCount,
    selectIsInit,
    selectIsLoading,
    selectIsError,
} from './suggested-article.selectors';
import { ISearchOptions } from "../../models/IRequestOptions";
import { KbLinkedListFacade } from "../linkage/linked-article.facade";

@Injectable()
export class KbSuggestedFacade {

    constructor(private store$: Store<IKbState>, private kbLinkedFacade: KbLinkedListFacade) { }

    public getArticles(): Observable<IArticle[]> {
        return this.store$.pipe(select(selectAllArticles));
    }

    public getTotalObjectCount(): Observable<number> {
        return this.store$.pipe(select(selectTotalObjectCount));
    }

    public isInit(): Observable<boolean> {
        return this.store$.pipe(select(selectIsInit));
    }

    public isLoadingSuggestedAticles(): Observable<boolean> {
        return this.store$.pipe(select(selectIsLoading));
    }

    public getSuggestedArticle(options: ISearchOptions) {
        this.store$.dispatch(new SuggestedArticles(options));
    }

    public isError(): Observable<boolean> {
        return this.store$.pipe(select(selectIsError));
    }

    public getSuggestedArticlesBasedLinkage(): Observable<IArticle[]> {
        return this.getArticles().pipe(
            combineLatest(
                this.kbLinkedFacade.getArticles(),
                (_suggestedArticles, _linkedArticles) => {
                    let suggestedArticles: IArticle[] = Object.assign([], _suggestedArticles);
                    suggestedArticles.map((_suggestedArticle) => {
                        const _linkedArticle = _linkedArticles.find((item) => item.id == _suggestedArticle.id);
                        _suggestedArticle.isLinked = _linkedArticle ? true : false;
                    });
                    return suggestedArticles;
                }
            ))
    }
}