import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { /*cold,*/ hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OpenArticle, BackArticle /*, OpenArticleError*/ } from './article.actions';
import { KbViewEffects } from './article.effects';
import { MockArticle } from '../../models/mock/Article.mock';

describe('ArticleEffects', () => {
    let actions$: Observable<any>;
    let effects: KbViewEffects;
    let router: jasmine.SpyObj<Router>;
    let location: jasmine.SpyObj<Location>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                KbViewEffects,
                provideMockActions(() => actions$),
                {
                    provide: Router,
                    useValue: {
                        navigate: jasmine.createSpy()
                    }
                },
                {
                    provide: Location,
                    useValue: {
                        back: jasmine.createSpy()
                    }
                }
            ]
        });

        effects = TestBed.get(KbViewEffects);
        router = TestBed.get(Router);
        location = TestBed.get(Location);
    });

    describe('openArticle', () => {
        it('should navigate to corresponding route', () => {
            const action = new OpenArticle(MockArticle);
            actions$ = hot('--a', { a: action });
            effects.openArticle$.subscribe(() => {
                expect(router.navigate).toHaveBeenCalledWith(['/kbDetail', MockArticle]);
            })
        }); 

        // it('should return a stream with error when open failed', () => {
        //     const openError = new Error('some error');
        //     const action = new OpenArticle(MockArticle);
        //     const errorAction = new OpenArticleError('error message');
        //     actions$ = hot('-a|', { a: action });
        //     spyOn(router, 'navigate').and.returnValue(openError);
        //     const expected = cold('--|', { b: errorAction });
        //     expect(effects.openArticle$).toBeObservable(expected);
        // });  
    });

    describe('backArticle', () => {
        it('should back to search page', () => {
            const action = new BackArticle();
            actions$ = hot('-a', {a: action});
            expect(effects.backToSearchPage$).toBeObservable(actions$);
            expect(location.back).toHaveBeenCalled();
        });
    });
});