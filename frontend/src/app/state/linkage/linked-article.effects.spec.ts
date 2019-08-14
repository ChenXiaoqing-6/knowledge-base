import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { cold, hot } from "jasmine-marbles";
import { Observable } from "rxjs";
import { AlertService } from 'fundamental-ngx';
import { TranslateService } from '@ngx-translate/core';
import { CollectionResponse } from "../../models/IResponse";
import { KbService } from "../../services/kb.service";
import { MockLinkedArticlesResponse } from "../../services/mock/mock-data";
import { KbServiceMock } from "../../services/mock/kb.service.mock";
import { GetLinkedArticles, GetLinkedArticlesSuccess, GetLinkedArticlesError } from "./linked-article.actions";
import { KbLinkedArticlesEffects } from "./linked-article.effects";
import { IExtendArticleLinkage } from "../../models/IArticleLinkage";


describe('KbLinkedEffects', () => {
    let actions$: Observable<Action>;
    let effects: KbLinkedArticlesEffects;
    let kbService: any = new KbServiceMock();
    const alertService: jasmine.Spy = jasmine.createSpy();
    const translateService: jasmine.Spy = jasmine.createSpyObj('TranslateService', ['instant']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                KbLinkedArticlesEffects,
                provideMockActions(() => actions$),
                {
                    provide: KbService,
                    useValue: kbService
                },
                {
                    provide: AlertService,
                    useValue: alertService
                },
                {
                    provide: TranslateService,
                    useValue: translateService
                }
            ]
        });
    });

    describe('KbLinkedEffects-getLinkedArticle$', () => {

        beforeEach(() => {
            kbService = TestBed.get(KbService);
            effects = TestBed.get(KbLinkedArticlesEffects);
        });

        it('should be created', () => {
            expect(effects).toBeTruthy();
        });

        it('should return a stream with articles when loading success', () => {
            const linkedResult: CollectionResponse<IExtendArticleLinkage> = MockLinkedArticlesResponse;
            const action = new GetLinkedArticles({objectRef: {objectId:'caseId', objectType:'case'}, pagination: {pageSize: 1, pageIndex: 1}});
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
            expect(effects.getLinkedArticle$).toBeObservable(expected);
        });

        it('should return a stream with error when load failed', () => {
            const linkedError = new Error('some error');
            const action = new GetLinkedArticles({objectRef: {objectId:'caseId', objectType:'case'}, pagination: {pageSize: 1, pageIndex: 1}});            
            const errorAction = new GetLinkedArticlesError({ error: linkedError });
            actions$ = hot('-a|', { a: action });
            const response = cold('-#|', {}, linkedError);
            kbService.getLinkedArticles.and.returnValue(response);
            const expected = cold('--(b|)', { b: errorAction });
            expect(effects.getLinkedArticle$).toBeObservable(expected);
        });
    })

});