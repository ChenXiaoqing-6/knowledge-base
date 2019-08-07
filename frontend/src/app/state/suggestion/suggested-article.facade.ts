import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
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
    selectArticleById
} from './suggested-article.selectors';
import { ISearchOptions } from "../../models/IRequestOptions";

@Injectable()
export class KbSuggestedFacade {

    constructor(private store$: Store<IKbState>) { }

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

    public getSelectedArticle(id: string): Observable<IArticle> {
        return this.store$.pipe(select(selectArticleById, {id}));
    }

}