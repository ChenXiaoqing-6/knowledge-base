import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";
import { IArticle } from "../../models/IArticle";
import { CollectionResponse } from "../../models/IResponse";
import { KbService } from "../../services/kb.service";
import { MockLinkedArticlesResponse } from "../../services/mock/mock-data";
import { GetLinkedArticles, GetLinkedArticlesSuccess, GetLinkedArticlesError } from "./linked-article.actions";
import { KbLinkedArticlesEffects } from "./linked-article.effects";


describe('KbLinkedEffects', () => {
    let actions$: Observable<Action>;
    let effects: KbLinkedArticlesEffects;
    let kbService: jasmine.SpyObj<KbService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                KbLinkedArticlesEffects,
                provideMockActions(() => actions$),
                {
                    provide: KbService,
                    useValue: {
                        getLinkedArticles: jasmine.createSpy()
                    }
                }
            ]
        });
    });

    describe('KbLinkedEffects-GetLinkedArticle$', () => {

        beforeEach(() => {
            kbService = TestBed.get(KbService);
            effects = TestBed.get(KbLinkedArticlesEffects);
        });

        it('should be created', () => {
            expect(effects).toBeTruthy();
        });

        it('should return a stream with articles when loading success', () => {
            const linkedResult: CollectionResponse<IArticle> = MockLinkedArticlesResponse;
            const action = new GetLinkedArticles();
            const successAction = new GetLinkedArticlesSuccess(
                {
                    data: linkedResult.data,
                    totalCount: linkedResult.totalObjectCount
                }
            );
            actions$ = hot('-a', { a: action });
            const response = cold('-a|', { a: linkedResult });
            kbService.getLinkedArticles.and.returnValue(response);
            const expected = cold('--b', { b: successAction });
            expect(effects.GetLinkedArticle$).toBeObservable(expected);
        });

        it('should return a stream with error when load failed', () => {
            const linkedError = new Error('some error');
            const action = new GetLinkedArticles();
            const errorAction = new GetLinkedArticlesError({ error: linkedError });
            actions$ = hot('-a|', { a: action });
            const response = cold('-#|', {}, linkedError);
            kbService.getLinkedArticles.and.returnValue(response);
            const expected = cold('--(b|)', { b: errorAction });
            expect(effects.GetLinkedArticle$).toBeObservable(expected);
        });
    })

});