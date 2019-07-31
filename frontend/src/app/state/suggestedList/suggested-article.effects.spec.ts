import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { KbSuggestedArticlesEffects } from "./suggested-article.effects";
import { KbService } from "../../services/kb.service";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Helper as PageHelper } from "../../models/IPagination";
import { CollectionResponse } from "../../models/IResponse";
import { IArticle } from "../../models/IArticle";
import { MockSearchResponse } from "../../services/mock/mock-data";
import { SuggestedArticles, SuggestedArticlesSuccess, SuggestedArticlesError } from "./suggested-article.actions";
import { hot, cold } from "jasmine-marbles";

describe('KbSuggestedArticlesEffects', () => {
    let actions$: Observable<Action>;
    let effects: KbSuggestedArticlesEffects;
    let kbService: jasmine.SpyObj<KbService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                KbSuggestedArticlesEffects,
                provideMockActions(() => actions$),
                {
                    provide: KbService,
                    useValue: {
                        searchArticles: jasmine.createSpy()
                    }
                }
            ]
        });
    });

    describe('KbSuggestedArticlesEffects-GetSuggestedArticles$', () => {

        beforeEach(() => {
            kbService = TestBed.get(KbService);
            effects = TestBed.get(KbSuggestedArticlesEffects);
        });

        it('should be created', () => {
            expect(effects).toBeTruthy();
        });

        it('should return a stream with articles when loading success', () => {
            const suggestedResult: CollectionResponse<IArticle> = MockSearchResponse;
            const pagination = PageHelper.createSuggestedPagination();
            const action = new SuggestedArticles({
                pagination: pagination,
                searchTerm: 'Angular'
            });
            const successAction = new SuggestedArticlesSuccess({
                data: suggestedResult.data,
                totalCount: suggestedResult.totalObjectCount
            });
            actions$ = hot('-a', { a: action });
            const response = cold('-a|', { a: suggestedResult });
            kbService.searchArticles.and.returnValue(response);
            const expected = cold('--b', { b: successAction });
            expect(effects.GetSuggestedArticles$).toBeObservable(expected);
        });

        it('should return a stream with error when load failed', () => {
            const searchError = new Error('some error');
            const pagination = PageHelper.createSuggestedPagination();
            const action = new SuggestedArticles({
                pagination: pagination,
                searchTerm: 'abc'
            });
            const errorAction = new SuggestedArticlesError({ error: searchError });
            actions$ = hot('-a|', { a: action });
            const response = cold('-#|', {}, searchError);
            kbService.searchArticles.and.returnValue(response);
            const expected = cold('--(b|)', { b: errorAction });
            expect(effects.GetSuggestedArticles$).toBeObservable(expected);
        });
    });

});