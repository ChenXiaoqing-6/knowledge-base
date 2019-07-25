import { TestBed } from '@angular/core/testing';
import { ModalService } from 'fundamental-ngx';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { OpenArticle, OpenArticleError } from './article.actions';
import { KbViewEffects } from './article.effects';
import { MockArticle } from '../../models/mock/Article.mock';
import { Router } from '@angular/router';

describe('TodoListEffects', () => {
    let actions: Observable<any>;
    let effects: KbViewEffects;
    let router: jasmine.SpyObj<Router>;
    let location: jasmine.SpyObj<Location>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                KbViewEffects,
                provideMockActions(() => actions),
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
        // it('should return a stream with CloseArticle action', () => {
        //     const action = new OpenArticle(MockArticle);
        //     const outcome = new CloseArticle();

        //     actions = hot('-a', { a: action });
        //     const response = cold('-a|', { a: of('test') });
        //     modalService.open.and.returnValue({ afterClosed: response });

        //     const expected = cold('--b', { b: outcome });
        //     expect(effects.openArticle$).toBeObservable(expected);
        // });

        it('should fail and return an OpenArticleError action', () => {
            const action = new OpenArticle(MockArticle);
            const error = new Error('some error') as any;
            const outcome = new OpenArticleError(error);

            actions = hot('-a', { a: action });
            const response = cold('-#|', {}, error);
            modalService.open.and.returnValue({ afterClosed: response });

            const expected = cold('--(b|)', { b: outcome });
            expect(effects.openArticle$).toBeObservable(expected);
        });
    });
});