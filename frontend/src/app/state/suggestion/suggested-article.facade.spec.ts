import { StoreMock } from "../mock/store.mock";
import { KbSuggestedFacade } from "./suggested-article.facade";
import { fakeAsync } from "@angular/core/testing";
import { of, throwError } from 'rxjs';
import { ISearchOptions } from "../../models/IRequestOptions";
import { SuggestedArticles } from "./suggested-article.actions";


describe('KbSuggestedFacade', () => {
    let storeMock: StoreMock;
    let kbViewFacade: KbSuggestedFacade;

    beforeEach(() => {
        storeMock = new StoreMock();
        kbViewFacade = new KbSuggestedFacade(<any>storeMock);
    });

    it('should return all articles in the state if success', fakeAsync(() => {
        const articles = [{ id: '1' }, { id: '2' }, { id: '3' }];
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

    it('should return isInit in the state if success', fakeAsync(() => {
        const isInit = true;
        storeMock.pipe.and.returnValue(of(isInit));
        kbViewFacade.isInit().subscribe((_response: any) => {
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
        kbViewFacade.isInit().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return isLoadingSuggestedAticles in the state if success', fakeAsync(() => {
        const isLoading = true;
        storeMock.pipe.and.returnValue(of(isLoading));
        kbViewFacade.isLoadingSuggestedAticles().subscribe((_response: any) => {
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
        kbViewFacade.isLoadingSuggestedAticles().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return isError in the state if success', fakeAsync(() => {
        const isError = true;
        storeMock.pipe.and.returnValue(of(isError));
        kbViewFacade.isError().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(isError);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.isError().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should dispatch SuggestedArticles', fakeAsync(() => {
        let payload = {
            searchTerm: 'test'
        } as ISearchOptions;
        kbViewFacade.getSuggestedArticle(payload);
        expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new SuggestedArticles(payload));
    }));

    it('should return selectedArticle in the state if success', fakeAsync(() => {
        const articles = [{ id: '1' }, { id: '2' }, { id: '3' }];
        storeMock.pipe.and.returnValue(of(articles));
        kbViewFacade.getSelectedArticle('1').subscribe((_response: any) => {
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
        kbViewFacade.getSelectedArticle("1").subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));


});