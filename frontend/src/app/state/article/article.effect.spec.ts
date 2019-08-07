import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { OpenArticle, BackArticle } from './article.actions';
import { KbViewEffects } from './article.effects';

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

    describe(': openArticle', () => {
        it('should navigate to corresponding route', () => {
            const articleId = '100';
            const action = new OpenArticle(articleId);
            actions$ = hot('--a', { a: action });
            effects.openArticle$.subscribe(() => {
                expect(router.navigate).toHaveBeenCalledWith([`article/${articleId}`]);
            });
        });  
    });

    describe(': backToSearchPage', () => {
        it('should back to search page', () => {
            const action = new BackArticle();
            actions$ = hot('-a', {a: action});
            expect(effects.backToSearchPage$).toBeObservable(actions$);
            expect(location.back).toHaveBeenCalled();
        });
    });
});