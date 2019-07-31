import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IKbState } from "../index";
import { Observable } from "rxjs";
import { IArticle } from "../../models/IArticle";
import { SuggestedArticles, InitSuggestedArticles } from './suggested-article.actions';
import {
    selectAllArticles,
    selectTotalObjectCount,
    selectIsCompleted,
    selectIsLoading,
    selectIsError
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

    public isCompleted(): Observable<boolean> {
        return this.store$.pipe(select(selectIsCompleted));
    }

    public isLoadingSuggestedAticles(): Observable<boolean> {
        return this.store$.pipe(select(selectIsLoading));
    }

    public getsuggestedArticle(options: ISearchOptions) {
        this.store$.dispatch(new InitSuggestedArticles());
        this.store$.dispatch(new SuggestedArticles(options));
    }

    public isError(): Observable<boolean> {
        return this.store$.pipe(select(selectIsError));
    }

}