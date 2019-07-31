import { Helper as PaginationHelper } from '../../models/IPagination';
import { SearchArticlesReset, SearchArticles, LoadNextPage } from './search-article.actions';
import { ISearchOptions } from './../../models/IRequestOptions';
import { of, throwError } from 'rxjs';
import { StoreMock } from './../mock/store.mock';
import { KbSearchFacade } from './search-article.facade';
import { fakeAsync } from '@angular/core/testing';

describe('KbSearchFacade', () => {
    let storeMock: StoreMock;
    let kbViewFacade: KbSearchFacade;

    beforeEach(() => {
        storeMock = new StoreMock();
        kbViewFacade = new KbSearchFacade(<any>storeMock);
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

    it('should dispatch SearchArticlesReset if the search term is empty', () => {
        kbViewFacade.searchArticles({
            searchTerm: ' '
        } as ISearchOptions);
        expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new SearchArticlesReset())
    });

    it('should dispatch SearchArticles if the search term is not empty', () => {
        let payload = {
            searchTerm: 'test'
        } as ISearchOptions;
        kbViewFacade.searchArticles(payload);
        expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new SearchArticles(payload));
    });

    it('should dispatch LoadNextPage if user scroll down to load more articles', () => {
        kbViewFacade.loadMoreArticles();
        expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new LoadNextPage());
    });

    it('should dispatch SearchArticlesReset if call resetSearch', () => {
        kbViewFacade.resetSearch();
        expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
        expect(storeMock.dispatch).toHaveBeenCalledWith(new SearchArticlesReset());
    });

    it('should return Pagination in the state if success', fakeAsync(() => {
        const pagination = PaginationHelper.create();
        storeMock.pipe.and.returnValue(of(pagination));
        kbViewFacade.getPagination().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(pagination);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.getPagination().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return SerachTerm in the state if success', fakeAsync(() => {
        const serachTerm = "search term";
        storeMock.pipe.and.returnValue(of(serachTerm));
        kbViewFacade.getSerachTerm().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(serachTerm);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.getSerachTerm().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return LastPage in the state if success', fakeAsync(() => {
        const lastPage = 1;
        storeMock.pipe.and.returnValue(of(lastPage));
        kbViewFacade.getLastPage().subscribe((_response: any) => {
            expect(_response).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_response).toBe(lastPage);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.getLastPage().subscribe((_response: any) => {
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

    it('should return isSearching in the state if success', fakeAsync(() => {
        const isLoading = true;
        storeMock.pipe.and.returnValue(of(isLoading));
        kbViewFacade.isSearching().subscribe((_response: any) => {
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
        kbViewFacade.isSearching().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(storeMock.pipe).toHaveBeenCalledTimes(1);
            expect(_error).toBe(error);
        });
    }));

    it('should return true if not loading and total count is 0', fakeAsync(() => {
        spyOn(kbViewFacade, 'isSearching').and.returnValue(of(false));
        spyOn(kbViewFacade, 'getTotalObjectCount').and.returnValue(of(0));

        kbViewFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBe(true);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should return false if loading', fakeAsync(() => {
        spyOn(kbViewFacade, 'isSearching').and.returnValue(of(true));
        spyOn(kbViewFacade, 'getTotalObjectCount').and.returnValue(of(0));

        kbViewFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBe(false);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should return false if not loading and total count is not 0', fakeAsync(() => {
        spyOn(kbViewFacade, 'isSearching').and.returnValue(of(false));
        spyOn(kbViewFacade, 'getTotalObjectCount').and.returnValue(of(2));

        kbViewFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBe(false);
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.isNotFound().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
            expect(_error).toBe(error);
        });
    }));


    it('should return correct PageSearchOptions if pageIndex <= lastPage', fakeAsync(() => {
        const pagination = {
            pageSize: 10,
            pageIndex: 1
        };
        const searchTerm = "search term";
        spyOn(kbViewFacade, 'getPagination').and.returnValue(of(pagination));
        spyOn(kbViewFacade, 'getLastPage').and.returnValue(of(10));
        spyOn(kbViewFacade, 'getSerachTerm').and.returnValue(of(searchTerm));

        kbViewFacade.getNextPageSearchOptions().subscribe((_response: any) => {
            expect(_response).toEqual({
                pagination: { ...pagination, pageIndex: pagination.pageIndex + 1 },
                searchTerm: searchTerm
            });
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should return null if pageIndex > lastPage', fakeAsync(() => {
        spyOn(kbViewFacade, 'getPagination').and.returnValue(of({
            pageIndex: 5
        }));
        spyOn(kbViewFacade, 'getLastPage').and.returnValue(of(2));
        spyOn(kbViewFacade, 'getSerachTerm').and.returnValue(of("search term"));

        kbViewFacade.getNextPageSearchOptions().subscribe((_response: any) => {
            expect(_response).toBeNull();
        }, _error => {
            expect(_error).toBeFalsy();
        });
    }));

    it('should throw error -> observable error', fakeAsync(() => {
        const error = { error: 'TestError' };
        storeMock.pipe.and.returnValue(throwError(error));
        kbViewFacade.getNextPageSearchOptions().subscribe((_response: any) => {
            expect(_response).toBeFalsy();
        }, _error => {
            expect(_error).toBeTruthy();
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

});