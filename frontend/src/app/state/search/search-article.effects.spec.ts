import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { AlertService } from "fundamental-ngx";
import { cold, hot } from "jasmine-marbles";
import { Observable, of } from "rxjs";
import { IArticle } from "../../models/IArticle";
import { Helper as PageHelper } from "../../models/IPagination";
import { ISearchOptions } from "../../models/IRequestOptions";
import { CollectionResponse } from "../../models/IResponse";
import { KbService } from "../../services/kb.service";
import { MockSearchResponse } from "../../services/mock/mock-data";
import { LoadNextPage, SearchArticles, SearchArticlesError, SearchArticlesSuccess } from "./search-article.actions";
import { KbSearchEffects } from "./search-article.effects";
import { KbSearchFacade } from "./search-article.facade";


describe('KbSearchEffects', () => {
    let actions$: Observable<Action>;
    let effects: KbSearchEffects;
    let kbFacade: jasmine.SpyObj<KbSearchFacade>;
    let kbService: jasmine.SpyObj<KbService>;
    let alertService: jasmine.SpyObj<AlertService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                KbSearchEffects,
                provideMockActions(() => actions$),
                {
                    provide: KbSearchFacade,
                    useValue: {
                        getNextPageSearchOptions: jasmine.createSpy()
                    }
                },
                {
                    provide: KbService,
                    useValue: {
                        searchArticles: jasmine.createSpy()
                    }
                },
                {
                    provide: AlertService,
                    useValue: {
                        open: jasmine.createSpy()
                    }
                }
            ]
        });
    });

    describe('KbSearchEffects-searchArticles$', () => {

        beforeEach(() => {
            kbService = TestBed.get(KbService);
            effects = TestBed.get(KbSearchEffects);
        });

        it('should be created', () => {
            expect(effects).toBeTruthy();
        });

        it('should return a stream with articles when loading success', () => {
            const searchResult: CollectionResponse<IArticle> = MockSearchResponse;
            const pagination = PageHelper.create();
            const action = new SearchArticles({
                pagination: pagination,
                searchTerm: 'abc'
            });
            const successAction = new SearchArticlesSuccess(
                {
                    data: searchResult.data,
                    pagination: pagination,
                    lastPage: searchResult.lastPage,
                    totalCount: searchResult.totalObjectCount
                },
                true
            );
            actions$ = hot('-a', { a: action });
            const response = cold('-a|', { a: searchResult });
            kbService.searchArticles.and.returnValue(response);
            const expected = cold('--b', { b: successAction });
            expect(effects.searchArticles$).toBeObservable(expected);
        });

        it('should return a stream with error when load failed', () => {
            const searchError = new Error('some error');
            const action = new SearchArticles({
                pagination: PageHelper.create(),
                searchTerm: 'abc'
            });
            const errorAction = new SearchArticlesError({ error: searchError });
            actions$ = hot('-a|', { a: action });
            const response = cold('-#|', {}, searchError);
            kbService.searchArticles.and.returnValue(response);
            const expected = cold('--(b|)', { b: errorAction });
            expect(effects.searchArticles$).toBeObservable(expected);
        });
    })

    describe('KbSearchEffects-loadNextPage$', () => {

        it('should return a stream with search article action if current page is less than last page', () => {
            const searchOptions = {
                pagination: {
                    pageIndex: 2,
                    pageSize: 10
                },
                searchTerm: 'abc'
            } as ISearchOptions;
            const searchAction = new SearchArticles(searchOptions);
            kbFacade = TestBed.get(KbSearchFacade);
            kbFacade.getNextPageSearchOptions.and.returnValue(of(searchOptions));
            effects = TestBed.get(KbSearchEffects);

            const action = new LoadNextPage();
            actions$ = hot('-a', { a: action });
            const expected = cold('-b', { b: searchAction });
            expect(effects.loadNextPage$).toBeObservable(expected);
        });

        it('should return a empty stream if current page is the last page', () => {
            kbFacade = TestBed.get(KbSearchFacade);
            kbFacade.getNextPageSearchOptions.and.returnValue(
                cold('-b|', { b: null })
            );
            effects = TestBed.get(KbSearchEffects);
            const action = new LoadNextPage();
            actions$ = hot('-a|', { a: action });
            const expected = cold('--|');
            expect(effects.loadNextPage$).toBeObservable(expected);
        });
    })

    describe('KbSearchEffects-SearchError$', () => {

        beforeEach(() => {
            effects = TestBed.get(KbSearchEffects);
            alertService = TestBed.get(AlertService);
        });

        it('should display error when loading failed', () => {
            const searchError = new Error('some error');
            const errorAction = new SearchArticlesError({ error: searchError });
            actions$ = hot('-a|', { a: errorAction });
            const expected = cold('--|');
            expect(effects.SearchError$).toBeObservable(expected);
            expect(alertService.open).toHaveBeenCalled();
        });
    })

});