import { Injectable } from "@angular/core";
import { KbService } from "../../services/kb.service";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActionTypes } from './suggested-article.actions';
import { 
    SuggestedArticles,
    SuggestedArticlesSuccess, 
    SuggestedArticlesError
} from "./suggested-article.actions";
import { switchMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class KbSuggestedArticlesEffects{

    constructor(
        private actions$:Actions,
        private kbService:KbService
    ){ }

    @Effect()
    GetSuggestedArticles$ = this.actions$
        .pipe(
            ofType<SuggestedArticles>(ActionTypes.SuggestedArticles),
            switchMap((action) => {
                return this.kbService.searchArticles(action.payload)
                    .pipe(
                        map(response => new SuggestedArticlesSuccess({
                            data:response.data,
                            totalCount:response.data.length
                        })),
                        catchError(error => of(new SuggestedArticlesError({error})))
                    );
            })
        );
   
}