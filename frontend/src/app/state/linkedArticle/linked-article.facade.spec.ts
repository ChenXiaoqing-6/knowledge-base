import { GetLinkedArticles, InitLinkedArticles } from './linked-article.actions';
import { of, throwError } from 'rxjs';
import { StoreMock } from './../mock/store.mock';
import { KbLinkedListFacade } from './linked-article.facade';
import { fakeAsync } from '@angular/core/testing';

describe('KbLinkedFacade', () => {
    let storeMock: StoreMock;
    let kbViewFacade: KbLinkedListFacade;

    beforeEach(() => {
        storeMock = new StoreMock();
        kbViewFacade = new KbLinkedListFacade(<any>storeMock);
    });

    it('should return all articles in the state if success', fakeAsync(() => {
        const articles = [{ id: '1' }, { id: '2' }, , { id: '3' }];
        storeMock.pipe.and.returnValue(of(articles));
        kbViewFacade.getArticles().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(articles);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.getArticles().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should dispatch InitLinkedArticles and GetLinkedArticles when getLinkedArticles', () => {
        kbViewFacade.getLinkedArticles();
        expect(storeMock.dispatch).toHaveBeenCalledTimes(2);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new InitLinkedArticles());
        expect(storeMock.dispatch).toHaveBeenCalledWith(new GetLinkedArticles());
    });

    it('should return TotalObjectCount in the state if success', fakeAsync(() => {
        const totalObjectCount = 100;
        storeMock.pipe.and.returnValue(of(totalObjectCount));
        kbViewFacade.getTotalObjectCount().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(totalObjectCount);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.getTotalObjectCount().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return isCompleted in the state if success', fakeAsync(() => {
        const isInit = true;
        storeMock.pipe.and.returnValue(of(isInit));
        kbViewFacade.isCompleted().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(isInit);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.isCompleted().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return isLinkingArticles in the state if success', fakeAsync(() => {
        const isLoading = true;
        storeMock.pipe.and.returnValue(of(isLoading));
        kbViewFacade.isLinkingArticles().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(isLoading);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.isLinkingArticles().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

});