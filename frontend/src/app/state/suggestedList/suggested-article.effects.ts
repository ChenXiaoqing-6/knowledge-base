import { Injectable } from "@angular/core";
import { KbService } from "../../services/kb.service";
import { AlertService } from "fundamental-ngx";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ActionTypes } from './suggested-article.actions';
import { 
    SuggestedArticles,
    SuggestedArticlesSuccess, 
    SuggestedArticlesError
} from "./suggested-article.actions";
import { switchMap, catchError, map } from "rxjs/operators";
import { of, empty } from "rxjs";

@Injectable()
export class KbSuggestedArticlesEffects{

    constructor(
        private actions$:Actions,
        private kbService:KbService,
        private alertService:AlertService
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
    @Effect({dispatch:false})
    GetSuggestedArticlesError$ = this.actions$
        .pipe(
            ofType<SuggestedArticlesError>(ActionTypes.SuggestedArticlesError),
            switchMap((action)=>{
                let errMsg = `Cannot get suggested srticles because:${action.payload.error}`;
                this.alertService.open(errMsg,{
                    type:'error',
                    dismissible:false,
                    duration:3000
                });
                return empty();
            })
        );
}